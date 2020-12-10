var keys = require('../credentials/keys.js');
var Perms = require('./tools/image-permissions');

const googleImages = require('google-images');
var imageClient = new googleImages(keys.cseID, keys.apiKey);

var imageHandler = function (client, channel, content) {
    if (!content) {
        channel.send("Usage: !image <query>");
        return;
    }
    console.log("Searching for: ", content);
    imageClient.search(content)
        .then(function (images, anything) {
            let randomIndex = 0;

            console.log("Num results: ", images.length);
            do {
                randomIndex = Math.floor((Math.random() * images.length));
                console.log("Random index: ", randomIndex);
            } while (!Perms.domainIsAllowed(images[randomIndex]['url']))

            channel.send(images[randomIndex]['url']);
    });
}

module.exports = imageHandler;
