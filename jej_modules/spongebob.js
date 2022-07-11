var spongebobHandler = function (client, channel, content) {
    let CASE_CHANCE = 0.5;
    var spongecase = '';
    for (c of content) {
        var caseChoice = (Math.random() < CASE_CHANCE);
        if (caseChoice) {
            spongecase += c.toUpperCase();
        } else {
            spongecase += c.toLowerCase();
        }
    }
    console.log(spongecase);
    channel.send(spongecase);
}

module.exports = spongebobHandler;
