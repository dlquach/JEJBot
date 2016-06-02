"use strict";

var chai = require('chai');

var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var expect = chai.expect;
var should = chai.should();

var safe = "SAFESPACE";

var safespace = require('../jej_modules/tools/generate_box');

// This set of tests should pass to make sure everything works corretly.
// Should change to ES6 test to prevent all this overhead.
describe("Safespace Test Operators", function() {
    it("SAFESPACE.repeat(3)", function(done) {
        var expected = "SAFESPACESAFESPACESAFESPACE";

        (safe.repeat(3)).should.equal(expected);

        done();
    });

});

// This set shouldn't expand the size of the box.
describe("Safespace No Size Change", function() {
    it('HI', function(done) {
        // The spaces between the letters in the box portion.
        var spaces = (" ").repeat(34);
        // The number of times SAFESPACE should be repeated.
        var rows = safe.repeat(4);

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S                HI                S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join('')}\`\`\``;

        safespace("HI").should.equal(expected);

        done();
    });

    it('Empty', function(done) {
        // The spaces between the letters.
        var spaces = (" ").repeat(34);
        var rows = safe.repeat(4);
        
        var expected = "``\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S${spaces}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join('')}\`\`\``;

        done();
    });

    it('32 characters', function(done) {
        var rows = safe.repeat(4);
        var spaces = (" ").repeat(34);

        var text = alphabet + "oOoJeJ";

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S${" " + text + " "}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join("")}\`\`\``;

        safespace(text).should.equal(expected);

        done();
    });
});

var firstHalf = 'abcdefghijklm';
var secondHalf = 'nopqrstuvwxyz';
var alphabet = firstHalf + secondHalf;

describe("Safespace Size Change", function() {
    it('33 characters', function(done) {
        var rows = safe.repeat(5);
        var spaces = (" ").repeat(43);

        var text = alphabet + "oOoJeJe";

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S${"     " + text + "     "}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join("")}\`\`\``;

        safespace(text).should.equal(expected);

        done();

    });

    it('34 characters', function(done) {
        var rows = safe.repeat(5);
        var spaces = (" ").repeat(43);

        var text = alphabet + "oOoJeJeJ";

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S${"     " + text + "    "}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join("")}\`\`\``;

        safespace(text).should.equal(expected);

        done();
    });

    it('40 characters', function(done) {
        var rows = safe.repeat(5);
        var spaces = (" ").repeat(43);

        var text = alphabet + firstHalf.substring(0, firstHalf.length - 1);

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S${"   " + text + "  "}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join("")}\`\`\``;

    safespace(text).should.equal(expected);

    done();

    });


    it('41 characters', function(done) {
        var rows = safe.repeat(5);
        var spaces = (" ").repeat(43);

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;
        expected += `S${"  " + alphabet + firstHalf + "  "}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join("")}\`\`\``;

        safespace(alphabet + firstHalf).should.equal(expected);

        done();

    });

    it('off by juan off by juan  off by juan  off by juan', function(done) {
        var rows = safe.repeat(6);
        var spaces = (" ").repeat(52);

        var juan = 'off by juan off by juan  off by juan  off by juan';

        var expected = "```\n";
        expected += `${rows}\n`;
        expected += `A${spaces}C\n`;
        expected += `F${spaces}A\n`;
        expected += `E${spaces}P\n`;

        expected += `S${"  " + "off by juan off by juan  off by juan  off by juan" + " "}S\n`;
        expected += `P${spaces}E\n`;
        expected += `A${spaces}F\n`;
        expected += `C${spaces}A\n`;
        expected += `${rows.split('').reverse().join("")}\`\`\``;

        safespace(juan).should.equal(expected);

        done();
    });
});
