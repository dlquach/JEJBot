const printKarma = require('./print');
const upvote = require('./upvote');
const downvote = require('./downvote');

/**
 * This method will process all messages input by users, and allocate karma points based on
 * the user's last two characters. ++ will add one karma to the content contained from the
 * beginning to the message upto the first +. -- acts the same way except it will sutract
 * one karma to the content.
 * @param {Discord.js.Client} client 
 * @param {Discord.js.Message} message 
 */
function assignKarma(client, message) {
    let msg = message.content;

    // Check for voting commands for karma
    var lastTwoChars = msg.slice(-2);
    if (lastTwoChars === '++') {
		upvote(msg.slice(0, msg.length - 2));
        return;
    }
    else if (lastTwoChars === '--') {
		downvote(msg.slice(0, msg.length - 2));
        return;
    }
}

module.exports = { 
	onBotInvocation: printKarma,
	onNonBotInvocations: assignKarma
};