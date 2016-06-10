"use strict";

var fs = require('fs');
var mkdirp = require('mkdirp');

function _getCurrTimeString() {
    var d = new Date();

    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

function _lineFormat(line) {
    var t = _getCurrTimeString();

    return `[${t}] ${line}`;
}

class Logger {
    constructor() {
        this.norm = [];
        this.warn = [];
        this.err = [];

        mkdirp('output', function (err) {
            if (err) throw err;
        });

        this.wstream = fs.createWriteStream('output/bot.log'); 
    }

    log(line) {
        var toPrint = _lineFormat(line);
        this.norm.push(toPrint);
        console.log(toPrint);
        this.wstream.write(toPrint + '\n');
    }

    warn(line) {
        var toPrint = _lineFormat("WARNING: " + line);
        this.warn.push(toPrint);
        console.log(toPrint);
        this.wstream.write(toPrint + '\n');
    }

    error(line) {
        var toPrint = _lineFormat("ERROR: " + line);
        this.err.push(toPrint);
        console.log(toPrint);
        this.wstream.write(toPrint + '\n');
    }

    saveLog() {
        this.wstream.end();
    }
}

var logger = new Logger();

module.exports = logger;