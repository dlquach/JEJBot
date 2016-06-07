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
}

function addGame(uniqueName, gameName) {
    stats[uniqueName] = new GameData(gameName);
};

function getTimes(uniqueName) {

};

module.exports = {
    addGame: addGame
};
