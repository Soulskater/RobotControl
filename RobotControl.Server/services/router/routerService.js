var topicEnum = require('./../../topicEnum');
var orientation = require('./../telemetry/orientation');

module.exports = {
    routeTopic: function (topicName, payload) {
        switch (topicName) {
            case topicEnum.orientation:
                orientation.dataReceived(payload);
                return true;
                break;
            default :
                console.log("Unknown topic " + topicName);
                return false;
        }
    }
};
