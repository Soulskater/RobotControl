var commandEnum = require('../enums/commandEnum');

module.exports = {
    processCommand: function (commandName, subCommandName) {
        var command = commandEnum[commandName];
        if (!command) {
            console.error("Unrecognized command, got " + commandName);
            return;
        }
        var subCommand = commandEnum[commandName].subCommands[subCommandName];
        switch (command.name) {
            case commandEnum.move.name:
                console.log(commandName, subCommandName);
        }
    }
};