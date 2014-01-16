// NMA_KEY should be set to a valid API-key in the shell before 
// running the unit test
var should = require('should');
var NMA = require('../lib/nma');
var apikey = process.env.NMA_KEY; // be sure to insert your own api key here

if ( !apikey ){
  console.log('API key not set');
}
var p2 = new NMA(apikey); // be sure to insert your own api key here

/*
beforeEach(function(){
  console.log('before every test')
  })
*/

describe('NMA Node.js API', function(){

  /* Empty API-key */
  p = new NMA('');
  it('detects using an empty API-key', function( done ){
    p.notify('node.js', 'Unit testing', 'Empty API-key', function( error, remaining ){
      should.not.exist(remaining);
      error.message.should.be.a('string');
      error.code.should.be.a('string');
      done();
    });
  });

  /* Invalid API-key */
  p = new NMA('1212689455abcd902342aaaaaafffffffffccccccccc0000');
  it('detects using an invalid API-key', function( done ){
    p.notify('node.js', 'Unit testing', 'Using an invalid API-key', function( error, remaining ){
      should.not.exist(remaining);
      error.message.should.be.a('string');
      error.code.should.be.a('string');
      done();
    });
  });

  /* Invalid length of API-key */
  p = new NMA('111111111111');
  it('detects using an API-key with invalid length', function( done ){
    p.notify('node.js', 'Unit testing', 'Using an API-key with invalid length', function( error, remaining ){
      should.not.exist(remaining);
      error.message.should.be.a('string');
      error.code.should.be.a('string');
      done();
    });
  });


  /* Valid key, valid message */	
  it('notifies when minimum valid information is added', function(done){
    p2.notify('node.js', 'Unit testing', 'Minimal message', function( error, remaining ){
	remaining.calls.should.be.a('number');	
	remaining.resettimer.should.be.a('number');	
	should.not.exist(error);
        done();	
     });
  });

  /* Valid key, missing parameter */	
  /*
  it('detects a missing parameter', function(done){
    p2.notify('node.js', 'Unit testing', function( error, remaining ){
        should.not.exist(remaining);
	err.should.be.a("object");
        done();	
     });
  });
  */

  /* Valid key, valid message, high priority */	
  it('notifies with high priority notification', function(done){
    p2.notify('node.js', 'Unit testing', 'High priority message', {priority: 2}, function( error, remaining ){
	remaining.calls.should.be.a('number');	
	remaining.resettimer.should.be.a('number');	
	should.not.exist(error);
        done();	
     });
  });

  /* Valid key, valid message in html and with an url, high priority */	
  it('notifies in html and with an url (high priority)', function(done){
    p2.notify('node.js', 'Unit testing', '<h1>Notification</h1> <div align="right"><font color="green">in</font> <strike>text</strike>html <tt>with an URL.</tt></div>', {priority: 2, url: 'http://www.example.com', contenttype: 'text/html'}, function( error, remaining ){
	remaining.calls.should.be.a('number');	
	remaining.resettimer.should.be.a('number');	
	should.not.exist(error);
        done();	
     });
  });

  /* FIXME: Too many calls, with a valid API-key */
  /* Valid key, valid message, too many messages sent */	
  it.skip('too many notifications', function(done){
    p2.notify('node.js', 'Unit testing', 'too many messages sent', function( error, remaining ){
	remaining.calls.should.be.a('number');	
	remaining.resettimer.should.be.a('number');	
  	console.log('Remaining calls: ' + remaining.calls);
  	console.log('Time before reset: ' + remaining.resettimer);
	should.not.exist(error);
        done();	
     });
  });

});
