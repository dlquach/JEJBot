var redeployHandler = function(client, channel) {
    client.sendMessage(channel, "Pulling...");
    require('simple-git').pull();
    client.sendMessage(channel, "Done.");
}

module.exports = redeployHandler;
