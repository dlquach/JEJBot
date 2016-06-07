var chai = require('chai');

var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var expect = chai.expect;
var should = chai.should();

var gameLogger = require('../jej_modules/tools/gamestats');

describe('GameStats Test', function() {
    it('Add a Game to the Log', function(done) {
        gameLogger.addGame('Test 1', 'League of Legends');

        console.log(gameLogger.getTimes('Test 1'));

        done();
    });
});