const con = require('./tools/sql');

var editHandler = function (client, channel, content) {
    let tokens = content.split(' ', 2);
    let name = tokens[0].trim();
    let url = tokens[1].trim();
    console.log(name);
    console.log(url);

    function validURL(str) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
    }

    if (validURL(url)) {
        con.query('SELECT url FROM jejlinks WHERE name = ?', name, function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            if (rows.length > 0) {
                let oldURL = rows[0]['url'];
                con.query('UPDATE jejlinks SET url = ? WHERE name = ?', [url, name], function (err, rows) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    channel.send("Edited j/" + name + " from " + "`" + oldURL + "` to `" + url + "`");
                });
            }
        });
    }
}
module.exports = editHandler;
