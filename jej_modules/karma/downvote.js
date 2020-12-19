const con = require('../tools/sql');

function downvote(name) {
    name = name.trim();
    con.query('INSERT INTO karma (name, karma, upvotes, downvotes) VALUES (?, -1, 0, 1) ON DUPLICATE KEY UPDATE  karma = karma - 1, downvotes = downvotes + 1', name, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = downvote;