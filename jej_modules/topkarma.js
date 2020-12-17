const topKarma = require('./karma/topkarma');

var topkarmaHandler = function (client, channel) {
    topKarma(client, channel);
}

module.exports = topkarmaHandler;
