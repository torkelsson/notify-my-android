# node-nma - NMA for Node.js API

Be happy! Send notifications to androids using the [Notify My Android 
service](http://www.notifymyandroid.com/). Simple, easy and clean.

As of now this API supports notify and only notify.

## Installation

	npm install node-nma

or put it in your package.json as usual and hit npm install. It depends
on xml2js and request.

## Usage

The API requires your API-key, which could be found/created under "My Account"
on the [Notify My Android website](http://www.notifymyandroid.com/).

Initialize it with your key and start notifying!

```javascript
var NMA = require('node-nma');

var nma = new NMA('MY-API-KEY');
```

Now, use the nma object whenever sending a notify:

```javascript
nma.notify('My app', 'The happiest day', 'This is the happiest day', function( err, remaining ){
	if( err ) throw err;
	console.log( 'I have ' + remaining.calls + ' calls left to the api during current hour. BOOM!' );
});
```

You can provide more [options](https://www.notifymyandroid.com/api.jsp#notify) to the notification:

```javascript
nma.notify('My app', 'The happiest day', 'This is the happiest day!', {
	priority: 1,
	url: 'http://en.wikisource.org/wiki/(The_Happiest_Day)'
}, function( err, remaining ){
	if( err ) throw err;
	console.log( 'I have ' + remaining.calls + ' calls left to the api during current hour. BOOM!' );
});
```

## Contribute

I´d be happy if you wanted to contribute with pull requests or tips.
I´ll add you to the contributors list here and in the package.json file.

## Testing

While contributing, make sure to write a test and make it pass if you
extend the library. Tests are written in the test directory, preferably
in all.js, since its quite small right now. It uses should.js and mocha
for tests.

Test by installing mocha and should.js (dev dependencies) and then just
hit:

	NMA_KEY=[my key here] make

And voila, it autotests for you.

## Legacy

node-nma is heavily based on [node-prowl}(https://github.com/arnklint/node-prowl.git).
