var NMA = require('../lib/nma');
var nma = new NMA( process.env.NMA_KEY ); // be sure to insert your own here

nma.notify('My app', 'The happiest day', 'This is the happiest day!', {
        priority: 1,
        url: 'http://en.wikisource.org/wiki/(The_Happiest_Day)'
}, function( err, remaining ){
        if( err ) throw err;
        console.log( 'I have ' + remaining.calls + ' calls left to the api during current hour. BOOM!' );
});
