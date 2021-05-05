var aganeHandler = function (client, channel) {
    channel.fetchMessages({ limit: 10 }).then(messages => {
        msgArray = messages.array();
        for (const msg in msgArray) {
            let m = msgArray[msg];
            if (!m.author.bot && m.content[0] == '!' && m.content != '!agane' && !m.content.includes('!echo')) {
                channel.send(m.content);
                return;
            }
        } 
    })
}

module.exports = aganeHandler;
