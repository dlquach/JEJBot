"use strict";

// Use dictionary to make isSupported faster.
var games = {
    'Overwatch': true,
    'League of Legends': true,
    'Starcraft 2': true,
    'Hearthstone': true,
    'Dota 2': true,
    'RuneScape': true
};

/**
 * Check to see if the input name is a part of a larger title. For an example, inputting
 * "league" is a part of "League of Legends" and so "isComponent" would return the title.
 * This function will return an array of all the objects that have that component in their
 * title.
 */
function _findGamesWithString(query) {
    var results = [];
    for (var name in games) {
        // Search for the string case-insensitive.
        if ((name.toLowerCase()).indexOf(query.toLowerCase()) > -1) {
            results.push(name);
        }
    }

    return results;
}

/**
 * Return true of false depending on whether the game being queried is a part of the games
 * dictionary contained within this module.
 */
function isSupported(query) {
    var results = _findGamesWithString(query);

    // If only 1 result, that means the correct one was found.
    if (results.length === 1) {
        return true;
    }

    // If any other, shouldn't return true.
    return false;
}

/**
 * Given a component of a game, get the first hit in the dictionary that matches
 * the queried string.
 */
function firstHit(query) {
    var results = _findGamesWithString(query);

    // If there is at least one hit, return the first game.
    if (results.length > 0) {
        return results[0];
    }

    return undefined;

}

module.exports = {
    raw: games,
    pretty: function() {
        var stringify = '';
        for (var title in games) {
            if (games.hasOwnProperty(title) && games[title]) {
                stringify += " - " + title + '\n';
            }
        }

        return stringify;
    },
    isSupported: isSupported,
    findFirstOccurance: firstHit
};
