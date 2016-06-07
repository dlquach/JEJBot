var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jejdb"
});

var printKarma = function (client, channel, name) {
    con.query('SELECT * FROM karma WHERE `name` = ?', name, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        if (rows) {
            var totalKarma = rows[0]['karma'];
            var upvotes = rows[0]['upvotes'];
            var downvotes = rows[0]['downvotes'];
            client.sendMessage(channel, name + ": " + "total (" + totalKarma + "): " + upvotes + "++, " + downvotes + "--");
        }
    });
}

var upvote = function (name) {
    con.query('INSERT INTO karma (name, karma, upvotes, downvotes) VALUES (?, 1, 1, 0) ON DUPLICATE KEY UPDATE  karma = karma + 1, upvotes = upvotes + 1', name, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
    });

}

var downvote = function(name) {
    con.query('INSERT INTO karma (name, karma, upvotes, downvotes) VALUES (?, -1, 0, 1) ON DUPLICATE KEY UPDATE  karma = karma - 1, downvotes = downvotes + 1', name, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports.printKarma = printKarma; 
module.exports.upvote = upvote; 
module.exports.downvote = downvote; 
