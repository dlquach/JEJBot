var flipHandler = function (client, channel, content) {
    var coin = (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
    channel.send(coin);
}

module.exports = flipHandler;
