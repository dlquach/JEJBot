function helpHandler(_, channel) {
    // This import needs to be here to prevent infinite dependency loop.
    const handlers = require('./tools/invocations').botInvocationHandlers;
    // Create the string that contains all commands.
    let helpString = 'Supported commands:\n';

    // Add each command available to us to the final string.
    for (const command in handlers) {
        helpString += `- ${command}\n`;
    }

    // Send string to requested channel.
    channel.send(helpString);
}

module.exports = helpHandler;