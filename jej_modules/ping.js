var pingHandler = function (client, channel) {
    client.sendMessage(channel, "pong");
}

module.exports = pingHandler;
