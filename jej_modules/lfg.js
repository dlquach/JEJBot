"use strict";

var gameList = require('../jej_modules/tools/game_list').pretty();

class GameList {
    constructor() {
        this.games = {};
    }

    addGame(playerName, game) {
        // If the player already has a list, add to list.
        if (playerName in this.games) {
            this.games[playerName].push(game);
        } else {
            this.games[playerName] = [game];
        }
    }
    
    stringifyList() {
        var result = '';
        for (var user in this.games) {
            result += user + "\n";
        
            // Iterate through list of games.
            for (var game in this.games[user]) {
                result += " - " + game + "\n";
            }
        }

        return result;
    }
}

var gameList = new GameList();

var lfgHandler = function(client, channel, content) {

    

    /*
    var user = channel.messages['0'].author.id;
    var roles = channel.server.roles;

    // The number of roles that exist.
    var length = parseInt(roles.length);

    // Create dict of titles -> roles.
    var games = {};

    for (var i = 0; i < length; ++i) {
        var role = roles[i];
        
        // If the role's name doesn't have @, it's a game
        if ((role.name).indexOf('@') == -1) {
            games[role.name.toLowerCase()] = role;
        }
    }
   
    removeRoleFromUser(user, channel);

    if (content in games) {
        client.addMemberToRole(user, games[content.toLowerCase()], function(error) {
            if (error) {
                console.log(error);
            }
        });
    } else {
        client.sendMessage(channel, "Invalid game. Here's what's available:\n" + gameList);
    }
    */
};

module.exports = lfgHandler;
