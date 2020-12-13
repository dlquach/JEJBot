var googleImageSearch = require('../jej_modules/tools/google-image-search.js');

var gifHandler = function (client, channel, content) {
    googleImageSearch.search(client, channel, content, {type: 'animated'});
}

module.exports = gifHandler;
