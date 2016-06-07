"use strict";

var UserMethods = require('./tools/user_methods');
var GameStats = require('./tools/gamestats');

function statsString(stats) {
    var result = '';

    for (var game in stats) {
        var m = Math.floor(stats[game] / 60);
        var seconds = stats[game] % 60;

        var h = Math.floor(m / 60);
        var minutes = m % 60;

        var days = Math.floor(h / 24);
        var hours = Math.floor(h & 24);

        result += game + ': ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds\n';
    }

    return result;
}

var statsHandler = function (client, channel, _, message) {
    var uniqueName = UserMethods.getUniqueName(message.author);
    var id = UserMethods.getId(message.author);

    GameStats.getExistingTimes(id, function (stats) {
        client.sendMessage(channel, statsString(stats));
    });
};

module.exports = statsHandler;
