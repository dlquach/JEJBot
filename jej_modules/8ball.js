var eightBallHandler = function (client, channel, content, message) {
    let positiveFortunes = [
        'you may count on it',
        'as i see it, yes',
        'most likely',
        'certainly',
        'indeed'
    ];
    let negativeFortunes = [
        'my sources say no',
        'don\'t count on it',
        'not at this time',
        'very doubtful',
        'probably not'
    ];
    let neutralFortunes = [
        'ask again later',
        'unclear',
        'better not to tell you now',
        'concentrate and ask again',
        'reply hazy, try again'
    ];

    let fortunes = [].concat(positiveFortunes).concat(negativeFortunes).concat(neutralFortunes);

    var fortune = (Math.floor(Math.random() * fortunes.length));
    channel.send(message.author + ': ' + fortunes[fortune]);
}

module.exports = eightBallHandler;
