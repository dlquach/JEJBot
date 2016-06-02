var keys = require('../credentials/keys.js');

const googleImages = require('google-images');
var imageClient = googleImages(keys.cseID, keys.apiKey);

var imageHandler = function (client, channel, content) {
    if (!content) {
        client.sendMessage(channel, "Usage: !image <query>");
    }
    console.log("Searching for: ", content);
    imageClient.search(content)
        .then(function (images, anything) {
            var randomIndex = Math.floor((Math.random() * images.length));
            console.log("Random index: ", randomIndex);
            console.log("Num results: ", images.length);
            client.sendMessage(channel, images[randomIndex]['url']);
    });
}

module.exports = imageHandler;
