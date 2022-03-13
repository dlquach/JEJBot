const snoowrap = require('snoowrap');
const keys = require('../credentials/keys.js');

let r = new snoowrap({
    userAgent: 'jej for pulling random posts from subreddits',
    clientId: keys.redditId,
    clientSecret: keys.redditSecret,
    refreshToken: keys.redditOauthRefresh
});
r.config({debug: true});


var searchInTierlist = function (query) {
    return r.getSubreddit('tierlists').search({
        query: query,
        sort: 'relevance'
    }).then(results => { 
        let randomIndex = Math.floor((Math.random() * results.length));
        return results[randomIndex];
    }).catch(err => {
       return false;  
    });
}

var tierlistHandler = async function (client, channel, content) {
    if (content.length == 0) {
        channel.send('Please provide what you would like a tierlist for.');
        return;
    }

    let maxTries = 3;
    var count = 0;
    var theResult = false;
    while (!theResult && count <= maxTries) {
        count++;
        theResult = await searchInTierlist(content);
    }
    if (theResult) {
        channel.send({
            embed: {
                title: theResult.title,
                url: 'https://www.reddit.com' + theResult.permalink
            },
        });
        channel.send(theResult.url)
    }
}

module.exports = tierlistHandler;
