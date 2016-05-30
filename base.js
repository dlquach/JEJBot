var Discord = require('discord.js');
var client = new Discord.Client({ queue : true });

var login = require('./credentials/login.js');

// Import handlers
var handlers = require('./jej_modules');

console.log('JEJBot loaded with:');
for (command in handlers) 
    console.log(" - ", command);

client.on('message', function(message) {
    var msg = message.content;
    var formattedMessage = msg.split(' ', 3);
    var firstWord = formattedMessage[0];
    var command = formattedMessage[1];
    var contentStart = formattedMessage[2];

    // lmao hacky
    if (contentStart)
        var content = msg.substring(msg.indexOf(contentStart));
    
    if (firstWord === 'jejbot') {
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
            handlers[command](client, message.channel, content);
        else
            client.sendMessage(
                message.channel, 
                'Unrecognized command. Say "jejbot help" for commands.'
            );
    }
});

client.login(login.username, login.password);
