var commandEnum = require('../../Robot.Common/enums/commandEnum');
var eventEnum = require('../../Robot.Common/enums/eventEnum');
var protoBufConfig = require('../../Robot.Common/protoBufConfig');
var protoBufHelper = require('../../Robot.Common/protoBufHelper');
var motionService = require('./motionService');
var telemetryService = require('./telemetryService');
var socketService = require('./socketService');

module.exports = {
    processCommand: function (commandName, subCommandName) {
        switch (commandName) {
            case commandEnum.move:
                motionService.processCommand(subCommandName);
                break;
            case commandEnum.telemetry:
                var data = telemetryService.getTelemetryData();
                socketService.emit(eventEnum.telemetry, protoBufHelper.encode(protoBufConfig.telemetry, data));
                break;
            default :
                console.error("Unrecognized command", commandName);
                return;
        }
    }
};