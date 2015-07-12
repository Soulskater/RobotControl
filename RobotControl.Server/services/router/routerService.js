var topicEnum = require('./../../topicEnum');
var orientation = require('./../telemetry/orientation');
var distance = require('./../telemetry/distance');

module.exports = {
    routeTopic: function (topicName, payload) {
        switch (topicName) {
            case topicEnum.orientation:
                orientation.dataReceived(payload);
                return true;
                break;
            case topicEnum.distance:
                distance.dataReceived(payload);
                return true;
                break;
            default :
                console.log("Unknown topic " + topicName);
                return false;
        }
    }
};
