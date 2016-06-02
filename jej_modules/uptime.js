/**
 * Uptime lel
 */
var uptimeHandler = function(client, channel) {
    client.sendMessage(channel, client.uptime);
}

module.exports = uptimeHandler;
