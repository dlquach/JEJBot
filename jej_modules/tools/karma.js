var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jej",
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
            channel.send(name + ": " + "total (" + totalKarma + "): " + upvotes + "++, " + downvotes + "--");
        }
    });
}

var upvote = function (name) {
    name = name.trim();
    con.query('INSERT INTO karma (name, karma, upvotes, downvotes) VALUES (?, 1, 1, 0) ON DUPLICATE KEY UPDATE  karma = karma + 1, upvotes = upvotes + 1', name, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
    });

}

var downvote = function(name) {
    name = name.trim();
    con.query('INSERT INTO karma (name, karma, upvotes, downvotes) VALUES (?, -1, 0, 1) ON DUPLICATE KEY UPDATE  karma = karma - 1, downvotes = downvotes + 1', name, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

var printTopKarma = function(client, channel) {
    con.query('SELECT * FROM karma ORDER BY karma DESC Limit 5', function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        if (rows) {
            var message = '';
            for (row of rows) {
                var name = row['name'];
                var totalKarma = row['karma'];
                var upvotes = row['upvotes'];
                var downvotes = row['downvotes'];
                var messageFragment = name + ": " + "total (" + totalKarma + "): " + upvotes + "++, " + downvotes + "--";
                message = message + messageFragment + "\n";
            }
            channel.send(message);
        }
    });

}

module.exports.printKarma = printKarma; 
module.exports.upvote = upvote; 
module.exports.downvote = downvote; 
module.exports.printTopKarma = printTopKarma; 
