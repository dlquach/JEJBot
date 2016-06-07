"use strict";

var stats = {};

function getTime() {
    return new Date().getTime() / 1000;
}

class Timer {
    constructor() {
        // Start counting the time.
        this.start = getTime();
    }

    timePlayed() {
        var curr = getTime();

        return curr - this.start;
    }
}

/**
 * Add a game to the user's list of game times being tracked.
 */
function addGame(uniqueName, gameName) {
    // If the name already exists, check to see if the game does.
    if (uniqueName in stats) {
        // Game should only be added if it doesn't exist in the dictionary for the user.
        if (!(gameName in stats[uniqueName])) {
            // Has to be this way or it'll create a dictionary with 'gameName' as key.
            stats[uniqueName] = {};
            stats[uniqueName][gameName] = new Timer();
            // If it does, then print it out to debug.
        } else {
            console.log("This should NOT have been reached.");
            console.log("\tGameStats is adding a new Timer to a game that already exists: " + gameName);
        }
        // If the user doesn't even exist, just create everything.
    } else {
        stats[uniqueName] = {};
        stats[uniqueName][gameName] = new Timer();
    }
}

function removeGame(uniqueName, gameName) {
    // Find the TimeData object corresponding to the gameName.
    delete stats[uniqueName][gameName];
}

/**
 * Get a dictionary of the times associated with each game from the input user name.
 */
function getTimes(uniqueName) {
    var gameList = stats[uniqueName];

    // Iterate through the keys of the dictionary to get the array of times.
    return (Object.keys(gameList)).map(function (gameName) {
        var game = gameList[gameName];

        var dict = {};

        return dict[gameName] = game.timePlayed();
    });
}


module.exports = {
    addGame: addGame,
    getTimes: getTimes
};
