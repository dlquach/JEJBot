var Perms = require('./tools/image-permissions');

var iBlockHandler = function (client, channel, content) {
    var usageText = "Usage: !iblock <add | remove | list> <input>";

    if (!content) {
        channel.send(usageText);
        return;
    }

    [cmd, domain] = content.split(' ');

    switch (cmd.toLowerCase()) {
        case "add": {
            Perms.addToDeniedDomains(domain);
            console.log(`Added ${domain} to Denied Domains`);
            break;
        }

        case "remove": {
            Perms.removeFromDeniedDomains(domain);
            console.log(`Removed ${domain} from Denied Domains`);
            break;
        }

        case "list": {
            channel.send(Perms.stringifyDeniedDomains());
            break;
        }

        default: {
            channel.send(usageText);
            break;
        }
    }


}

module.exports = iBlockHandler;
