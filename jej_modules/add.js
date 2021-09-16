const con = require('./tools/sql');

var addHandler = function (client, channel, content) {
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
        con.query('INSERT INTO jejlinks (name, url) VALUES (?, ?)', [name, url], function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rows);
            channel.send("`" + url + "` added as j/" + name);
        });
    }
}
module.exports = addHandler;
