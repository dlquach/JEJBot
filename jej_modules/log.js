var Logger = require('./tools/logger');

var logHandler = function(client, channel) {
    Logger.log("Uploading log file.");

    client.sendFile(channel, 'output/bot.log');
}

module.exports = logHandler;
