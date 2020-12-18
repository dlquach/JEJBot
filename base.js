var Discord = require('discord.js');
var client = new Discord.Client({ queue: true });

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

// The character to invoke bot commands.
const invocationCommand = '!';
// This character signifies the token that splits command from content
const tokenDelimiter = ' ';

client.on('message', function (message) {
    // ignore all bots
    if (message.author.bot) {
        return;
    }

    const msg = message.content;
    // Assume trigger char always is at the beginning of message.
    const invocation = msg[0];

    // Grab where the command ends. If message is just a command, return the length of the message. 
    const commandSplit = msg.indexOf(tokenDelimiter) > -1 ? msg.indexOf(tokenDelimiter) : msg.length;
    // First char is invocation, so grab second char to the first space.
    const command = msg.substring(1, commandSplit)
    // To get the content, get the substring from the split index + length of delimiter.
    const content = msg.substring(commandSplit + tokenDelimiter.length);

    // Keep track of whether a bot command was invoked.
    let cmdInvoked = false;
    if (invocation === invocationCommand) {
        if (command in botInvocationHandlers) {
            botInvocationHandlers[command](client, message.channel, content, message);
            cmdInvoked = true;
        }
        else if (command === '' || command[0] === invocationCommand) {
            // Change this to check alphanumeric or something later
            return;
        }
        else
            message.channel.send(
                'Unrecognized command. Say "!help" for commands.'
            );
    }

    // If a bot command wasn't invoked, then run it through all background listeners.
    if (!cmdInvoked) {
        for (const cmd of allMessageHandlers) {
            // This can be replaced with event-emitters if the bot grows large.
            handlers[cmd].onNonBotInvocations(client, message);
        }
    }
});

client.on('disconnected', function () {
    console.log("Disconnected!");
    process.exit(1);
});

client.login(login.token);
