const fs = require('fs');
const path = require('path');

function isModule(fname) {
    // A js file is defaulted as a module.
    if (fname.match(/\.js$/) !== null && fname !== 'index.js') {
        return true;
    }

    // If the module exists inside a folder, check for an index.js file to import.
    const modulePath = path.join(__dirname, fname);
    // Check if current fname is a folder.
    if (fs.lstatSync(modulePath).isDirectory()) {
        // Check each file within folder for an index.js
        for (const file of fs.readdirSync(modulePath)) {
            if (file === 'index.js') {
                return true;
            }
        }
    }

    return false;
}

// Lifted from StackOverflow http://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
fs.readdirSync(__dirname + '/').forEach(function (file) {
    if (isModule(file)) {
        var name = file.replace('.js', '');
        const imported = require(`./${file}`);

        // Allow the commandName variable in each file to override default filename invocation.
        exports[imported.commandName || name] = imported;
    }
});
