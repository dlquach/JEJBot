"use strict";

var games = require('../jej_modules/tools/games_supported');

var GameList = require('../jej_modules/tools/gamelist');
var gameList = new GameList();

var usage = `Usage:
!lfg\t\t\t\t\t\t\t\t\tTo see the current members LFG.
!lfg support\t\t\t\t\tTo see games currently supported by LFG.
!lfg <Game> <Time>\tTo add yourself to the LFG list.`;

/**
 * Parse the message sent by the user. This will simply split into two tokens separated by a space.
 * If 
 */
function parseContent(content) {
    // If empty content, show list.
    if (content === undefined) {
        return "";
    }

    var tokens = content.split(' ');
    var mins = parseInt(tokens[tokens.length - 1]);

    // Token component validation.
    if (isNaN(mins)) {
        return undefined;
    }

    // Put together the name of the game before returning.
    var gameName = (tokens.slice(0, tokens.length - 1)).join(' ');

    return {
        'game': gameName,
        'time': mins
    };
}

var lfgHandler = function(client, channel, content, message) {
    var username = message.author.username + '#' + message.author.discriminator;

    // Parse the content and see if it's valid.
    var tokens = parseContent(content);

    if (tokens === undefined) {
        client.sendMessage(channel, usage);
        return;
    }
   
    // Empty string input means show the list. 
    if (tokens === "") {
        client.sendMessage(channel, gameList.stringifyList());
    }
    else if (games.isSupported(tokens.game)) {
        console.log(username + " is looking for " + tokens.game + " for " + tokens.time + " minutes.");
        gameList.addGame(username, tokens.game);
    } else {
        client.sendMessage(channel, "Invalid game. Here's what's available:\n" + games.pretty());
    }
};

module.exports = lfgHandler;
