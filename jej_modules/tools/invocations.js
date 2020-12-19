const handlers = require('../');

function arrayToInvokeDict(event, prevDict, currCmd) {
	prevDict[currCmd] = handlers[currCmd][event] || handlers[currCmd];
	return prevDict;
}

// Handlers that run on cleaned content either have a onBotInvocation method, or the function is the only object available
const botInvocationHandlers = Object.keys(handlers).filter(k => typeof (handlers[k]) === "function" || handlers[k].onBotInvocation)
	.reduce((prev, curr) => {
		return arrayToInvokeDict('onBotInvocation', prev, curr);
	}, {});

const nonBotInvocationHandlers = Object.keys(handlers).filter(k => handlers[k].onNonBotInvocation)
	.reduce((prev, curr) => {
		return arrayToInvokeDict('onNonBotInvocation', prev, curr);
	}, {});

	
module.exports = {
	botInvocationHandlers,
	nonBotInvocationHandlers
}