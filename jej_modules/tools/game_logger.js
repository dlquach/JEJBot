"use strict";

var stats = {};

class GameData {
    constructor(gameName) {
        this.game = gameName;

        // Start counting the time.
        this.start = getCurrentTime();
    }

    getCurrentTime() {
        return new Date().getTime() / 1000;
    }

    get timePlayed() {
        var curr = new Date().getTime() / 1000;

        return curr - this.start;
    }
}

function addGame(uniqueName, gameName) {
    stats[uniqueName] = new GameData(gameName);
};

function getTimes(uniqueName) {
    
};

module.exports = {
    addGame: addGame
};
