var Discord = require('discord.js');

var tempestHandler = function (client, channel, content, message) {
    for (var channel of channel.guild.channels) {
        if (channel[1] instanceof Discord.VoiceChannel) {
            console.log("channel")
            // Find the voice channel that the sender is in
            for (var member of channel[1].members) {
                if (member[0] === message.author.id) {
                    console.log('found');
                    channel.join()
                        .then(connection => {
                            console.log(channel);
                            return playTempest(client, channel);
                        })
                        .then(dispatcher => {
                            dispatcher.on('error', console.error);
                        })
                        .catch(console.error);
                }
            }
        }
    }
}

function playTempest(client, channel) {
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

function error(e) {
    console.log(e.stack);
}

module.exports = tempestHandler;
