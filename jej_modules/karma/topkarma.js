const con = require('../tools/sql');

function printTopKarma(_, channel) {
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

module.exports = printTopKarma;