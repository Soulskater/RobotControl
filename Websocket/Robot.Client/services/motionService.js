var motionDirectionEnum = require('../../Robot.Common/enums/motionDirectionEnum');

function _start(motionDirection) {
    if (!motionDirectionEnum[motionDirection]) {
        console.warn("Unrecognized motion direction!", motionDirection);
        return;
    }
    console.info("Do motion", motionDirection);
}

function _stop() {
    console.info("Stop motion");
}

module.exports = {
    processCommand: function (subCommand) {
        if (subCommand === motionDirectionEnum.none) {
            _stop();
        }
        else {
            _start(subCommand);
        }
    }
};