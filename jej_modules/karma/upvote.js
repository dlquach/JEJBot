const con = require('../tools/sql');

function upvote(name) {
    name = name.trim();
    con.query('INSERT INTO karma (name, karma, upvotes, downvotes) VALUES (?, 1, 1, 0) ON DUPLICATE KEY UPDATE  karma = karma + 1, upvotes = upvotes + 1', name, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = upvote;