const con = require('../tools/sql');

function printKarma(_, channel, name) {
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

module.exports = printKarma;