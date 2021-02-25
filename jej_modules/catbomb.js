var imageSearch = require('../jej_modules/tools/image-search.js');

var catBombHandler = function (client, channel) {
    const QUERY = 'cat';
    const NUM_IMAGES = 5;
    imageSearch.bingSearch(client, channel, QUERY, '', NUM_IMAGES);
}

module.exports = catBombHandler;
