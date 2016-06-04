"use strict";

var games = require('../jej_modules/tools/games_supported');

var GameList = require('../jej_modules/tools/gamelist');
var gameList = new GameList();

var usage = `Usage:
!lfg\t\t\t\t\t\t\t\t\tTo see the current members LFG.
!lfg support\t\t\t\t\tTo see games currently supported by LFG.
!lfg leave\t\t\t\t\t\tTo remove yourself from LFG entirely.
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

    // Special cases
    if (tokens[0] == 'support' || tokens[0] == 'leave') {
        return tokens[0]
    }

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
        console.log('LFG list queried by ' + username);
        client.sendMessage(channel, gameList.stringifyList());
    // Handle SUPPORT input
    } else if (tokens === 'support') {
        console.log('Supported games being listed for ' + username);
        client.sendMessage(channel, "Supported games:\n" + games.pretty());
    // Handle LEAVE input
    } else if (tokens === 'leave') {
        var msg = username + " has been removed from LFG.";
        gameList.removePlayer(username);
        console.log(msg);
        client.sendMessage(channel, msg);
    }
    // Handle supported games
    else if (games.isSupported(tokens.game)) {
        var matchedGame = games.findFirstOccurance(tokens.game);

        console.log(username + " is looking for " + matchedGame + " for " + tokens.time + " minutes.");
        gameList.addGame(username, matchedGame);
        client.sendMessage(channel, username + " is now looking for " + matchedGame + " for " + tokens.time + " minutes.");
    // All other cases
    } else {
        console.log(tokens.game + ' was just queried. Invalid game, please check.');
        client.sendMessage(channel, "Invalid game. Here's what's available:\n" + games.pretty());
    }
};

module.exports = lfgHandler;
