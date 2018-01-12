/**
 * Does a pull which should trigger the nodemon to restart the app.
 */
var redeployHandler = function(client, channel) {
    require('simple-git')().pull();
    channel.send("Pulled from master.");
}

module.exports = redeployHandler;
