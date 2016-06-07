var karma = require('../jej_modules/tools/karma.js');

var karmaHandler = function (client, channel, content) {
    karma.printKarma(content);
}

module.exports = karmaHandler;
