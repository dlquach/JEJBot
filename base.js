var Discord = require('discord.js');
var client = new Discord.Client({ queue : true });

var login = require('./credentials/login.js');

// Import handlers
var handlers = require('./jej_modules');


// Accumulate handlers meant to process every message
const allMessageHandlers = Object.keys(handlers).filter(k => handlers[k].onAllMessages);
const botInvocationHandlers = require('./jej_modules/tools/invocations').botInvocationHandlers;


// Print out commands the bot will interpret
console.log('JEJBot loaded with:');
for (let command in botInvocationHandlers) {
    console.log(`- ${command}`);
}

client.on('message', function(message) {
    // ignore all bots
    if (message.author.bot) {
        return;
    }

    /**
     * This should only be called if a bot invocation wasn't made.
     * Call handlers that run on all messages
     */
    for (const cmd of allMessageHandlers) {
        handlers[cmd].onAllMessages(client, message);
    }
    
    const msg = message.content;
    const formattedMessage = msg.split(' ', 2);
    const invocationCheck = formattedMessage[0][0];
    const command = formattedMessage[0].substring(1);
    const contentStart = formattedMessage[1];

    // lmao hacky
    if (contentStart)
        var content = msg.substring(msg.indexOf(contentStart));
    
    if (invocationCheck === '!') {
        if (command in botInvocationHandlers)
            botInvocationHandlers[command](client, message.channel, content, message);
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
