var pingHandler = function (client, channel) {
    channel.send("pong");
}

module.exports = pingHandler;
