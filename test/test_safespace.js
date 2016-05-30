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

        var expected = `\`\`\`
${rows}
A${spaces}C
F${spaces}A
E${spaces}P
S                HI                S
P${spaces}E
A${spaces}F
C${spaces}A
${rows.split('').reverse().join('')}\`\`\``;

        safespace("HI").should.equal(expected);

        done();
    });

    it('Empty', function(done) {
        // The spaces between the letters.
        var spaces = (" ").repeat(34);
        var rows = safe.repeat(4);
        
        var expected = `\`\`\`
${rows}
A${spaces}C
F${spaces}A
E${spaces}P
S${spaces}S
P${spaces}E
A${spaces}F
C${spaces}A
${rows.split('').reverse().join('')}\`\`\``;

    done();
    });
});

var firstHalf = 'abcdefghijklm';
var secondHalf = 'nopqrstuvwxyz';
var alphabet = firstHalf + secondHalf;

describe("Safespace Size Change", function() {
    it('One extension', function(done) {
        var rows = safe.repeat(5);
        var spaces = (" ").repeat(43);

        var expected = `\`\`\`
${rows}
A${spaces}C
F${spaces}A
E${spaces}P
S${"  " + alphabet + firstHalf + " "} S
P${spaces}E
A${spaces}F
C${spaces}A
${rows.split('').reverse().join("")}\`\`\``;

    safespace(alphabet + firstHalf).should.equal(expected);

    done();

    });
});
