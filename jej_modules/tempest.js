var Discord = require('discord.js');
var sleep = require('sleep');

var tempestHandler = function (client, channel, content, message) {
    for (var channel of channel.server.channels) {
        if (channel instanceof Discord.VoiceChannel) {
            // Find the voice channel that the sender is in
            for (var member of channel.members) {
                if (member.id === message.author.id) {
                    console.log('found');
                    client.joinVoiceChannel(channel, function (error, connection) {
                        if (connection) {
                            connection.playFile(
                                '../audio/tempest.wav',
                                {
                                    volume: '1.0',
                                },
                                function (error, intent) {
                                    if (error) console.log(error);
                                    intent.on("end", function() {
                                        connection.stopPlaying();
                                        client.leaveVoiceChannel(channel).catch(error);
                                        console.log('done');
                                    });
                                }
                            );
                        }
                        if(error) console.log(error);
                    });
                }
            }
        }
    }
}

function playTempest(client, channel) {
}

function error(e) {
    console.log(e.stack);
}

module.exports = tempestHandler;
