"use strict";

var gamesSupported = require('../jej_modules/tools/game_list').pretty();

var GameList = require('../jej_modules/tools/gamelist');

var gameList = new GameList();

var lfgHandler = function(client, channel, _, message) {
    var user = message.author.id;

    
    client.sendMessage(channel, "Invalid game. Here's what's available:\n" + gamesSupported);
};

module.exports = lfgHandler;
