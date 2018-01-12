var gemtimeHandler = function (client, channel) {
    channel.send("@everyone gemtime = datetime.datetime.now()");
}

module.exports = gemtimeHandler;
