"use strict";

var stats = {};

class TimeData {
    constructor(gameName) {
        this.game = gameName;

        // Start counting the time.
        this.start = getCurrentTime();
    }

    getCurrentTime() {
        return new Date().getTime() / 1000;
    }
}

function addGame(uniqueName, gameName) {
    // If the name already exists, create a new gameName.
    if (uniqueName in stats) {
        stats[uniqueName].push(new TimeData(gameName));
    } else {
        stats[uniqueName] = [new TimeData(gameName)];
    }
}

function removeGame(uniqueName, gameName) {
    delete stats[uniqueName]
}

function getTimes(uniqueName) {

}

module.exports = {
    addGame: addGame
};
