var echoHandler = function (client, channel, content) {
    client.sendMessage(channel, content);
}

module.exports = echoHandler;
