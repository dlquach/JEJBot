"use strict";

var games = {
    'Overwatch': true,
    'League of Legends': true
};

module.exports = {
    raw: games,
    pretty: function() {
        var stringify = '';
        for (var title in games) {
            if (games.hasOwnProperty(title) && games[title]) {
                stringify += title + '\n';
            }
        }

        return stringify;
    }
};
