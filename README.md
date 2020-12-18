# JEJBot
A Discord bot for my friends.

## Creating a new file module
This is for modules where a single file would suffice.
To create a module, simply create a js file in jej_modules.
At a minimum, the module must export a function for bot invocation.

## Creating a new folder module
If a module should have multiple files, create a folder in jej_modules.
Within the folder, create an index.js file.
The index.js file will act as the interfacing file just like a single file module.
The invocation command will be the folder name.

## module.exports behavior
jej_modules require an export.
By default, JEJBot will use the filename as the invocation command.
To enable additional functionality in a module, supply the following kvp in the exports.

Key | Value | Description
----- | ----- | -----
commandName | string | If a string is supplied, this will override the filename as the command.
onBotInvocation | function (Discord.Client, Discord.Channel, content) | This method is run when a user invokes the bot.
onNonBotInvocation | function (Discord.Client, Discord.Message) | If no command is invoked, this function will always be run.