const handlers = require('../');

// Handlers that run on cleaned content either have a onBotInvocation method, or the function is the only object available
const botInvocationHandlers = Object.keys(handlers).filter(k => typeof (handlers[k]) === "function" || handlers[k].onBotInvocation)
	.reduce((prev, curr) => {
		prev[curr] = handlers[curr].onBotInvocation || handlers[curr];
		return prev;
	}, {});

const allInvocationHandlers = Object.keys(handlers).filter(k => handlers[k].onAllMessages);

module.exports = {
	botInvocationHandlers,
	allInvocationHandlers
}