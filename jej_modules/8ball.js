var eightBallHandler = function (client, channel, content, message) {
    let fortunes = [
        'ask again later',
        'you may count on it',
        'as i see it, yes',
        'not at this time',
        'unclear',
        'very doubtful',
        'better not to tell you now',
        'concentrate and ask again',
        'most likely',
        'my sources say no',
        'reply hazy, try again',
        'don\`t count on it',
        'certainly',
        'indeed'
    ];

    var fortune = (Math.floor(Math.random() * fortunes.length));
    channel.send(message.author + ': ' + fortunes[fortune]);
}

module.exports = eightBallHandler;
