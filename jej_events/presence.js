var fs = require('fs');

var UserMethods = require('../jej_modules/tools/user_methods');
var GameStats = require('../jej_modules/tools/gamestats');

function filePathFromName(uniqueName) {
    return './resources/stats/' + uniqueName + '.txt';
}

/**
 * Read in the data that exists for a particular user. This function assumes that the file associated
 * with the user already exists.
 */
function readData(uniqueName, callback) {
    fs.readFile(filePathFromName(uniqueName), (error, data) => {
        if (error) throw error;

        var stats = JSON.parse(data);

        callback(stats);
    });
}

/**
 * Given the stats input to the function, write data that is the string represntation of the JSON input.
 */
function writeData(uniqueName, stats) {
    console.log('Writing to ' + uniqueName);
    fs.writeFile(filePathFromName(uniqueName), JSON.stringify(stats), (error) => {
        if (error) throw error;
    });
}

/**
 * Call when logging begins for a user playing a game.
 */
function beginLogging(uniqueName, gameName) {
    console.log('Logging has begun for ' + uniqueName + ' playing ' + gameName);

    GameStats.addGame(uniqueName, gameName);
}

/**
 * Call when logging ends for a user playing a game.
 */
function endLogging(uniqueName, gameName) {
    console.log('Logging has ended for ' + uniqueName + ' playing ' + gameName);

    readData(uniqueName, (currStats) => {
        // Get the current time spent for the game.
        var seconds = GameStats.getTime(uniqueName, gameName);

        console.log("\tPlayed for " + seconds + " seconds.");

        // Add the current time to the existing one, and save the resulting JSON.
        if (gameName in currStats) {
            currStats[gameName] += seconds;
        } else {
            currStats[gameName] = seconds;
        }

        writeData(uniqueName, currStats);
    });
}

/**
 * Main function of the stats tracking feature of the bot. It assumes that if the user in the before state
 * has a game, they are quitting that game. If a user in the after state has a game, they are just entering
 * the game.
 */
function gameTracker(before, after) {
    var name = UserMethods.getUniqueName(before);
    var game;
    // If the game is on the before state, it has been quit.
    if (UserMethods.getGame(before)) {
        game = UserMethods.getGame(before);
        console.log(name + ' has quit ' + game);
    }


    // If a game has been quit, have it quit logging for that user.
    if (game) {
        // Since stat is async, create temp so value is stored.
        var tempGame = game;

        // Make sure the user file exists. If not, create it.
        fs.stat(filePathFromName(name, tempGame), (err, res) => {
            // If no err
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.writeFileSync(filePathFromName(name, tempGame), '{}');
                }
            }

            endLogging(name, tempGame);
        });
    }

    game = undefined;
    if (UserMethods.getGame(after)) {
        game = UserMethods.getGame(after);
        console.log(name + ' has begun playing ' + game);
    }

    if (game) {
        beginLogging(name, game);
    } 
}

function presenceHandler(before, after) {
    var name = UserMethods.getUniqueName(before);

    // Validation to make sure it's the same user whose presence has been logged.
    var sameUser = name === UserMethods.getUniqueName(after);

    if (sameUser) {
        gameTracker(before, after);
    }
}

module.exports = presenceHandler;
