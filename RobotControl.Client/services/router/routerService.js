var topicEnum = require('./../../topicEnum');
var commandService = require('./../command/commandService');

module.exports = {
    routeTopic: function (topicName, payload) {
        switch (topicName) {
            case topicEnum.command:
                commandService.processCommand(payload);
                return true;
                break;
            case topicEnum.orientation:
                console.log("Orientation received!");
                return true;
                break;
            default :
                console.log("Unknown topic " + topicName);
                return false;
        }
    }
};
