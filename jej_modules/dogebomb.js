var imageSearch = require('../jej_modules/tools/image-search.js');

var dogeBombHandler = function (client, channel) {
    const QUERY = 'doge';
    const NUM_IMAGES = 5;
    imageSearch.bingSearch(client, channel, QUERY, '', NUM_IMAGES);
}

module.exports = dogeBombHandler;
