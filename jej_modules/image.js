var keys = require('../credentials/keys.js');

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
            var randomIndex = Math.floor((Math.random() * images.length));
            console.log("Random index: ", randomIndex);
            console.log("Num results: ", images.length);
            channel.send(images[randomIndex]['url']);
    });
}

module.exports = imageHandler;
