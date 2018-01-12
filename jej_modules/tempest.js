var Discord = require('discord.js');

var tempestHandler = function (client, channel, content, message) {
    const voice = message.member.voiceChannel;
    voice.join()
        .then(
            connection => {
                playTempest(connection, voice);
            }
        )
        .catch(console.error);
}

function playTempest(connection, channel) {
    const dispatcher = connection.playFile(
        '../audio/tempest.wav',
    );
    dispatcher.on('end', end => {
        channel.leave();
    });
}

function error(e) {
    console.log(e.stack);
}

module.exports = tempestHandler;
