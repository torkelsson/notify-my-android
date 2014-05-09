var request = require('request');
var querystring = require('querystring');
var helpers = require('./helpers');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

/**
 * NMA - send notifications to your Androids
 */
function NMA( apiKey ){
  this.apiKey = apiKey || undefined;

  this.endpoint = "https://www.notifymyandroid.com/publicapi/";
  this.timeout = 5000;

  /* TODO: Validate the api-key */
}

/** TODO:
 * validate - validate the API key

 */
var verify = function( callback ){
	return;
}

/**
 * notify - send notifications
 *
 *   Example
 *
 *   var nma = new NMA('MY-API-KEY');
 *   nma.notify('My app', 'The light is on', 'YO, this is awesomez!', 'more...', function( err, remaining ){
 *	   if( err ) throw err;
 *     console.log( 'I have ' + remaining.calls + ' calls to the api before it is resetted in ' + remaining.resettimer ' minutes');
 *   });
 *
 *
 * 
 * @param {String} application - the name of your application or the application generating the event
 * @param {String} event - the event name
 * @param {String} description - description of the event
 * @optional {Object} options
 *		* developerkey: Your developer key, if you have one.
 *		* priority: from -2 to 2, Emergency priority messages may 
 *		  bypass quiet hours according to the user's settings.
 *		* url: The URL which should be attached to the notification.
 * 		* contenttype: You can set this parameter to "text/html" 
 *		  while sending the notification, and some basic html tags 
 *		  will be interpreted and rendered while displaying the notification
 * @param {Function} callback - calls back with two parameters {String,String; Int,Int}; error code and message if any, and remaining api calls until you reach nma's limit and time left until the limit is reseted.
 *
 * @public
 */

var notify = function( application, event, description, options, callback ){
  if( !application ) throw new Error("First parameter \'application\' is missing");
  if( !event ) throw new Error("Second parameter \'event\' is missing");
  if( !description ) throw new Error("Third parameter \'description\' is missing");

  var me = this;
  if( typeof options == 'function' ){
    callback = options;
    options = {};
  }

  var defaults = {
    developerkey: null,
    priority: 0,
    url: null,
    contenttype: null
  }

  var options = helpers.merge( defaults, options );

  var formdata = { 
    "apikey": me.apiKey,
    "application": application,
    "event": event,
    "description": description,
    "priority": options.priority,
    "developerkey": options.developerkey,
    "url": options.url,
    "content-type": options.contenttype
  }

  //var url = me.endpoint + 'notify?' + querystring.stringify( query );
  var url = me.endpoint + 'notify?'; 

  request({
    method: 'POST',
    uri: url,
    form: formdata,
    timeout: me.timeout
  }, function( err, res ){
    if (err) {
      return callback (err, null);
    } else {
      parser.parseString(res.body, function (err, result) {
        var error = !!err ? err : !result['error'] ? null : {
          code: result['error']['@']['code'],
          message: result['error']['#'],
          resettimer: !result['error']['@']['code'] == '402' ? null :result['error']['@']['resettimer']*1
        }
	var remaining = (!!err) || (!result['success']) ? null : {
        	calls: result['success']['@']['remaining']*1,
        	resettimer: result['success']['@']['resettimer']*1
	}
        callback( error, remaining );
      });
    }
  })
}

NMA.prototype = {
  notify: notify,
//  verify: verify
}

module.exports = NMA;
