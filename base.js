var Discord = require('discord.js');
var client = new Discord.Client({ queue : true });

var login = require('./credentials/login.js');

// Import handlers
var handlers = require('./jej_modules');

console.log('JEJBot loaded with:');
console.log(handlers)

for (let command in handlers) {
    console.log(`- ${command}`);
}

// Accumulate handlers meant to process every message
const allMessageHandlers = Object.keys(handlers).filter(k => handlers[k].onAllMessages);

client.on('message', function(message) {
    // ignore all bots
    if (message.author.bot) {
        return;
    }

    // Call handlers that run on all messages
    for (const cmd of allMessageHandlers) {
        handlers[cmd].onAllMessages(client, message.channel);
    }
    
    var msg = message.content;
    var formattedMessage = msg.split(' ', 2);
    var invocationCheck = formattedMessage[0][0];
    var command = formattedMessage[0].substring(1);
    var contentStart = formattedMessage[1];

    // Check for voting commands for karma
    var lastTwoChars = msg.slice(-2);
    if (lastTwoChars === '++') {
//        karma.upvote(msg.slice(0, msg.length - 2));
        return;
    }
    else if (lastTwoChars === '--') {
//        karma.downvote(msg.slice(0, msg.length - 2));
        return;
    }

    // lmao hacky
    if (contentStart)
        var content = msg.substring(msg.indexOf(contentStart));
    
    if (invocationCheck === '!') {
        if (command === 'help') {
            message.channel.send(
                'Supported commands:'
            ).then( function () {
                for (command in handlers) {
                    message.channel.send(
                        ' - ' + command
                    );
                }
            });
            return;
        }
        if (command in handlers)
            handlers[command](client, message.channel, content, message);
        else if (command === '' || command[0] === '!') {
            // Change this to check alphanumeric or something later
            return;
        }
        else
            message.channel.send(
                'Unrecognized command. Say "!help" for commands.'
            );
    }
});
 
client.on('disconnected', function() {
    console.log("Disconnected!");
    process.exit(1);
});

client.login(login.token);
