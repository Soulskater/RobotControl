var eventEnum = require('../Robot.Common/enums/eventEnum');
var protoBufConfig = require('../Robot.Common/protoBufConfig');
var protoBufHelper = require('../Robot.Common/protoBufHelper');
var socketService = require('./services/socketService');
var commandService = require('./services/commandService');

var _serverAddress = "ws://192.168.1.112:8090";

socketService.connect(_serverAddress);

socketService.on(eventEnum.command, function (byteData) {
    var command = protoBufHelper.decode(protoBufConfig.command, byteData);
    if (!command) {
        console.warn("Invalid data sent from the server");
        return;
    }
    commandService.processCommand(command.name, command.subCommand);
});