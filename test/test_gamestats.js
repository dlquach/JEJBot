var chai = require('chai');

var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var expect = chai.expect;
var should = chai.should();

var GameList = require('../jej_modules/tools/gamelist');

describe('GameList Test', function() {
    it('Constructor', function(done) {
        var list = new GameList();
        
        // Use deep equal for array equality. Should be empty.
        (list.games).should.deep.equal({});

        done();
    });

    it('Player A: League of Legends', function(done) {
        var list = new GameList();

        list.addGame('Player A', 'League of Legends');

        var expected = {
            'Player A': ['League of Legends']
        };
        
        // Test actual list contents.
        (list.games).should.deep.equal(expected);
        // Test stringify
        (list.stringifyList()).should.equal("Player A\n - League of Legends\n");

        done();
    });

    it('Player A: Overwatch, Starcraft 2', function(done) {
        var list = new GameList();

        list.addGame('Player A', 'League of Legends');
        list.addGame('Player A', 'Starcraft 2');

        var expected = {
            'Player A': ['League of Legends', 'Starcraft 2']
        };

        // Test actual list contents.
        (list.games).should.deep.equal(expected);
        // Test stringify
        (list.stringifyList()).should.equal("Player A\n - League of Legends\n - Starcraft 2\n");

        done();
    });

    it('Player A: Overwatch, Player B: Starcraft 2', function(done) {
        var list = new GameList();

        list.addGame('Player A', 'League of Legends');
        list.addGame('Player B', 'Starcraft 2');

        var expected = {
            'Player A': ['League of Legends'],
            'Player B': ['Starcraft 2']
        };

        // Test actual list contents.
        (list.games).should.deep.equal(expected);
        // Test stringify
        (list.stringifyList()).should.equal("Player A\n - League of Legends\nPlayer B\n - Starcraft 2\n");

        done();

    });
});
