var gemtimeHandler = function (client, channel) {
    client.sendMessage(channel, "@everyone gemtime = datetime.datetime.now()");
}

module.exports = gemtimeHandler;
