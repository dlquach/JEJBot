var triggeredHandler = function (client, channel) {
    client.sendMessage(channel, "T R I G G E R E D");
}

module.exports = triggeredHandler;
