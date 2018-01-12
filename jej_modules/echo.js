var echoHandler = function (client, channel, content) {
    channel.send(content);
}

module.exports = echoHandler;
