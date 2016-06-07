"use strict";

var stats = {};

class Timer {
    constructor() {
        // Start counting the time.
        this.start = new Date().getTime() / 1000;
    }

    timePlayed() {
        var curr = new Date().getTime() / 1000;

        return curr - this.start;
    }
}

/**
 * Helper functon to help determine whether or not the game exists in the stats dictionary.
 */
function _gameExists(uniqueName, gameName) {
    if (uniqueName in stats) {
        if (gameName in stats[uniqueName]) {
            return true;
        }
    }

    // If the name or the game doesn't exist, return false.
    return false;
}

/**
 * Add a game to the user's list of game times being tracked.
 */
function addGame(uniqueName, gameName) {
    // If the name already exists, check to see if the game does.
    if (uniqueName in stats) {
            stats[uniqueName][gameName] = new Timer();
    } else {
        stats[uniqueName] = {};
        stats[uniqueName][gameName] = new Timer();
    }
}

/**
 * If the game exists in the stats dictionary, remove it. Otherwise do nothing. 
 */
function removeGame(uniqueName, gameName) {
    // Find the TimeData object corresponding to the gameName.
    if (_gameExists(uniqueName, gameName)) {
        delete stats[uniqueName][gameName];
    }
}

/**
 *  Get the time played from the user and name of the game. If no suitable game, return undefined.
 */
function getTime(uniqueName, gameName) {
    if (_gameExists(uniqueName, gameName)) {
        return stats[uniqueName][gameName].timePlayed();
    }

    return undefined;
};

/**
 * Get a dictionary of the times associated with each game from the input user name.
 */
function getTimes(uniqueName) {
    // If the user DNE, return undefined.
    if (!(uniqueName in stats)) {
        return undefined;
    }

    var gameList = stats[uniqueName];

    var dict = {};

    // Iterate through the keys and add the time played to the dictionary to be returned. 
    for (var key in gameList) {
        dict[key] = gameList[key].timePlayed();
    }

    return dict;
}


module.exports = {
    addGame: addGame,
    getTimes: getTimes,
    getTime: getTime,
    removeGame: removeGame
};
