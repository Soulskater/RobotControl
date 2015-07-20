var pythonService = require('./pythonService');
var motionDirectionEnum = require('../../Robot.Common/enums/motionDirectionEnum');
var path = require('path');

var pythonServoControlFile = path.join(__dirname, '../python/4wd_motor_control.py');

function _runPython(direction) {
    pythonService.runScript(pythonServoControlFile, direction);
}

module.exports = {
    processCommand: function (subCommand) {
        if (!motionDirectionEnum[subCommand]) {
            console.warn("Unrecognized motion direction!", subCommand);
            return;
        }
        _runPython(subCommand);
    }
};