var Discord = require('discord.js');

var tempestHandler = function (client, channel, content, message) {
    const voice = message.member.voiceChannel;
    voice.join()
        .then(
            connection => {
                console.log(voice);
                return playTempest(connection, voice);
            }
        )
        .catch(console.error);
}

function playTempest(connection, channel) {
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
