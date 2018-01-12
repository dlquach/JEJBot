var generateBox = require('../jej_modules/tools/generate_box');

var safespaceHandler = function (client, channel, content) {
    if (!content)
        content = " ";
    channel.send(generateBox(content));
}

module.exports = safespaceHandler;
