const con = require('../tools/sql');

function containsJLinkLookup(messageString) {
    return messageString.includes("j/");
}


// only processes the first found one
function getJLinkName(s) {
    console.log(s);
    let jLinkIndex = s.indexOf("j/");
    if (jLinkIndex >= 0) {
        let endOfNameIndex = s.indexOf(" ", jLinkIndex + 2);
        console.log(endOfNameIndex);
        if (endOfNameIndex == -1) endOfNameIndex = s.length;

        return s.slice(jLinkIndex + 2, endOfNameIndex + 1);
    }
    return "";
}

function jLinkLookup(_, message) {
    if (containsJLinkLookup(message.content)) {
        const name = getJLinkName(message.content);
        if (name.length <= 0) { 
            return;
        }
        console.log ("searching for " + name);

        con.query("SELECT url FROM jejlinks where `name` = ?", name, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rows)
            if (rows.length == 0) {
                message.channel.send("There is no j/ link at j/" + name + ". You can add something with `!add <name> <url>`."); 
            } else {            
                message.channel.send(rows[0]['url']);
            }
        });

    }

}


module.exports = jLinkLookup;

