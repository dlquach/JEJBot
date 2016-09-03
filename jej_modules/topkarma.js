var karma = require('../jej_modules/tools/karma.js');

var topkarmaHandler = function (client, channel) {
    karma.printTopKarma(client, channel);
}

module.exports = topkarmaHandler;
