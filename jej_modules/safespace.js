var generateBox = require('../jej_modules/tools/generate_box');

var safespaceHandler = function (client, channel, content) {
    if (!content)
        content = " ";
    client.sendMessage(channel, generateBox(content));
}

module.exports = safespaceHandler;
