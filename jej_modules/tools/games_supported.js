"use strict";

var games = {
    'Overwatch': true,
    'League of Legends': true,
    'Starcraft 2': true,
    'Hearthstone': true,
    'Dota 2': true
};

function isSupported(name) {
    if (name in games) {
        return true;
    }

    return false;
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
    isSupported: isSupported
};
