var chai = require('chai');

var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var expect = chai.expect;
var should = chai.should();

var gamesSupported = require('../jej_modules/tools/games_supported');

describe('Games Supported Test', function() {
    it('Games List', function(done) {
        expect(gamesSupported.raw).to.be.ok;

        done();
    });

    it('Find Starcraft 2', function(done) {
        expect(gamesSupported.isSupported('Starcraft 2')).to.be.true;
        expect(gamesSupported.findFirstOccurance('Starcraft 2')).to.equal('Starcraft 2');

        done();
    });
});
