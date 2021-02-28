const request = require('request');

var keys = require('../../credentials/keys.js');
var Perms = require('./image-permissions');

const googleImages = require('google-images');
var imageClient = new googleImages(keys.cseID, keys.apiKey);

// options needs to be a dict
// ex. {type: 'animated'}
var search = function (client, channel, content, options) {
    if (!content) {
        channel.send("Provide query please");
        return;
    }
    console.log("Searching for: ", content);
    imageClient.search(content, options)
        .then(function (images, anything) {
            let randomIndex = 0;
            
            // Save this bot from overwork :(
            let cycle = 0;

            if (images.length == 0) {
                channel.send("No results found for: " + content);
                return;
            }
            console.log("Num results: ", images.length);
            do {
                randomIndex = Math.floor((Math.random() * images.length));
                console.log("Random index: ", randomIndex);
                console.log("url: ", images[randomIndex]['url']);
                cycle++;
            } while (Perms.domainIsBlocked(images[randomIndex]['url']) && cycle < 100)

            channel.send(images[randomIndex]['url']);
        });
}

var bingSearch = function (client, channel, content, options, numImages = 1) {
    let https = require('https');
    let host = 'api.bing.microsoft.com';
    let path = '/v7.0/images/search';

    // no options for now
    let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(content) + '&' + options,
        headers : {
            'Ocp-Apim-Subscription-Key' : keys.bingApiKey,
        }
    };

    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            let imageResult = JSON.parse(body);
            if (imageResult.error) {
                console.log(imageResult.error);
                if (imageResult.error.code === '403') {
                    channel.send('Bing quota exceeded. Fallback...')
                        .then(msg => {
                            rapidSearch(client, channel, msg, content, numImages);
                        });
                }
                return;
            }
            let images = imageResult.value;
            if (images.length == 0) {
                channel.send("No results found for: " + content);
                return;
            }

            console.log(`Image result count: ${imageResult.value.length}`);
            for (var i = 0; i < numImages; i++) {
                let randomIndex = Math.floor((Math.random() * imageResult.value.length));
                let imageUrl = images[randomIndex]['contentUrl'];
                channel.send(imageUrl);
                console.log('Chosen image url:', imageUrl);
            }
        });
    };

    let req = https.request(request_params, response_handler);
    req.end();
}


var rapidSearch = function (client, channel, msg, content, numImages = 1) {
    // https://rapidapi.com/contextualwebsearch/api/web-search for documentation
    const options = {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
      qs: {q: content, pageNumber: '1', pageSize: '10', autoCorrect: 'false'},
      headers: {
        'x-rapidapi-key': keys.rapidApiKey,
        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        useQueryString: true
      }
    };

    request(options, function (error, response, body) {
        if (error) console.log(error);
        console.log(body);
        let imageResult = JSON.parse(body);
        if (imageResult.totalCount == 0) {
            channel.send('No results for: ' + content);
        } else {
            let images = imageResult.value;
            console.log(`Image result count: ${imageResult.totalCount}`);
            for (var i = 0; i < numImages; i++) {
                let randomIndex = Math.floor((Math.random() * images.length));
                let imageUrl = images[randomIndex]['url'];
                channel.send(imageUrl);
                console.log('Chosen image url:', imageUrl);
            }
        }
        msg.delete(1);
    });
}


module.exports.search = search; 
module.exports.bingSearch = bingSearch; 
