var Discord = require('discord.js');
var client = new Discord.Client({ queue : true });

var login = require('./credentials/login.js');

// Import handlers
var handlers = require('./jej_modules');

var UserMethods = require('./jej_modules/tools/user_methods');
var GameData = require('./jej_modules/tools/game_logger');

console.log('JEJBot loaded with:');
for (command in handlers) 
    console.log(" - ", command);

client.on('message', function(message) {
    var msg = message.content;
    var formattedMessage = msg.split(' ', 2);
    var invocationCheck = formattedMessage[0][0];
    var command = formattedMessage[0].substring(1);
    var contentStart = formattedMessage[1];

    // lmao hacky
    if (contentStart)
        var content = msg.substring(msg.indexOf(contentStart));
    
    if (invocationCheck === '!') {
        if (command === 'help') {
            client.sendMessage(
                message.channel, 
                'Supported commands:'
            ).then( function () {
                for (command in handlers) {
                    client.sendMessage(
                        message.channel, 
                        ' - ' + command
                    );
                }
            });
            return;
        }
        if (command in handlers)
            handlers[command](client, message.channel, content, message);
        else
            client.sendMessage(
                message.channel, 
                'Unrecognized command. Say "!help" for commands.'
            );
    }
});

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
        console.log(name + ' has quit '  + game);
    }
    
    // If a game has been quit, have it quit logging for that user.
    if (game) {
        
    };
    
    if (UserMethods.getGame(after)) {
        game = UserMethods.getGame(after);
        console.log(name + ' has begun playing ' + game);
    }

    
}

client.on('presence', function(before, after) {
    var name = UserMethods.getUniqueName(before);
    
    // Validation to make sure it's the same user whose presence has been logged.
    var sameUser = name === UserMethods.getUniqueName(after);

    if (sameUser) {
        gameTracker(before, after);
    }
});

client.login(login.username, login.password);
