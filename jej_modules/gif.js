var imageSearch = require('../jej_modules/tools/image-search.js');

var gifHandler = function (client, channel, content) {
    // this is for CSE
    // imageSearch.search(client, channel, content, {type: 'animated'});
    imageSearch.bingSearch(client, channel, content, 'imageType=AnimatedGif');
}

module.exports = gifHandler;
