/**
 * Uptime in days, hours, minutes, etc. Logic yanked from SO.
 */
var uptimeHandler = function(client, channel) {
    var date = new Date(client.uptime);
    var uptime = '';
    uptime += date.getUTCDate()-1 + " days, ";
    uptime += date.getUTCHours() + " hours, ";
    uptime += date.getUTCMinutes() + " minutes, ";
    uptime += date.getUTCSeconds() + " seconds.";
    channel.send("JEJBot has been alive for " + uptime);
}

module.exports = uptimeHandler;
