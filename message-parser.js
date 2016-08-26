"use strict";

var handlers = require('./jej_modules');

var karma = require('./jej_modules/tools/karma.js');

/**
 * Split the message string into tokens
 */
function _getMessageStringTokens(messageString) {
    return messageString.split(' ', 2);
}

function isValidCommandString(messageString) {
    const messageTokens = _getMessageStringTokens(messageString);

    return messageTokens[0] === "!";
}

function getContentFromMessageString(messageString) {
    const messageTokens = _getMessageStringTokens(messageString);

    return messageTokens[1];
}

function getKarmaTerm(messageString) {
    return messageString.slice(0, messageString.length - 2);
}

function shouldIncreaseKarma(messageString) {
    return messageString.slice(-2) === "++";
}

function shouldDecreaseKarma(messageString) {
    return messageString.slice(-2) === "--";
}



function messageHandler(message) {
    const messageString = message.content;

    if (shouldIncreaseKarma(messageString)) {
        karma.upvote(getKarmaTerm(messageString));
        return;
    }
    
    if (shouldDecreaseKarm(messageString)) {
        karma.downvote(getKarmaTerm(messageString));
        return;
    }

    if (isValidCommandString(messageString)) {

    }
}

