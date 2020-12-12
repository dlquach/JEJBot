"use strict";

var Perms = require('../jej_modules/tools/image-permissions');

var chai = require('chai');

var it = require('mocha/lib/mocha.js').it;
var describe = require('mocha/lib/mocha.js').describe;

var expect = chai.expect;
var should = chai.should();

describe('Image Permissions', () => {
    beforeEach(() => {
        Perms.clearDeniedDomains();
    });

    it('add to domain list', () => {
        Perms.addToDeniedDomains('jej.bot');
        Perms.addToDeniedDomains('bot.jej');

        expect(Perms._deniedDomains).to.eql(['jej.bot', 'bot.jej']);
    });

    it('remove from list', () => {
        Perms.addToDeniedDomains('jej.bot');
        Perms.addToDeniedDomains('bot.jej');

        Perms.removeFromDeniedDomains('jej.bot');

        expect(Perms._deniedDomains).to.eql(['bot.jej']);
    });

    it('check domain list', () => {
        Perms.addToDeniedDomains('jej.bot');
        Perms.addToDeniedDomains('bot.jej');

        expect(Perms.domainIsBlocked('http://www.jej.bot')).to.be.true;
        expect(Perms.domainIsBlocked('https://www.jej.bot')).to.be.true;
        expect(Perms.domainIsBlocked('hasdr://asert.jej.bot')).to.be.true;
        expect(Perms.domainIsBlocked('https://jaj.bot')).to.be.false;
    })
});