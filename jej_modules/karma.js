var karma = require('../jej_modules/tools/karma.js');

var karmaHandler = function (client, channel, content) {
    karma.printKarma(client, channel, content);
}

module.exports = karmaHandler;
