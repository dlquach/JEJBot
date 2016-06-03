"use strict";

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

    removePlayer(playerName) {
        delete this.games[playerName];
    }
    
    stringifyList() {
        var result = '';
        for (var user in this.games) {
            result += user + "\n";

            // Iterate through list of games.
            this.games[user].forEach(function(game) {
                result += " - " + game + "\n";
            });
        }

        return result;
    }
}

module.exports = GameList;
