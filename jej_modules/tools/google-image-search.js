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

module.exports.search = search; 
