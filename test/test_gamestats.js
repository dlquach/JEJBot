var chai = require('chai');

var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var expect = chai.expect;
var should = chai.should();

var gameLogger = require('../jej_modules/tools/gamestats');

describe('GameStats Test', function () {
    it('add a game to the log then get the time', function (done) {
        gameLogger.addGame('Test 1', 'League of Legends');

        expect(gameLogger.getTimes('Test 1')).to.be.ok;
        done();
    });

    it('remove the game that was previously added', function (done) {
        gameLogger.removeGame('Test 1', 'League of Legends');
        (gameLogger.getTimes('Test 1')).should.deep.equal({});

        done();
    });

    it('add multiple games and then get the times', function (done) {
        gameLogger.addGame('Test 1', 'SC2');
        gameLogger.addGame('Test 1', 'lol');

        // Since I can't directly mess with the Timer object, validate with making sure there is 1 user with 2 games.
        var times = gameLogger.getTimes('Test 1');
        expect(Object.keys(times).length).to.equal(2);
        done();
    });

    it('possible flakey tests: make sure all timers are 0 seconds', function (done) {
        var times = gameLogger.getTimes('Test 1');
        for (var game in times) {
            expect(times[game]).to.be.above(0.0);
        } 

        done();
    });
});