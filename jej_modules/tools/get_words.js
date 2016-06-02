"use strict";

var getWords = function(client, channel) {
    // For now limit messages to 500.
    var messages = client.getChannelLogs(channel, 500);

    // Only get the messages with @ mentions.
    var text = messages.map(function(message) {
        return message.cleanContent;
    });

    return text;
};

module.exports = getWords;
