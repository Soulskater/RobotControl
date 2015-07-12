var topicEnum = require('./../../topicEnum');
var commandEnum = require('./commandEnum');
var orientationService = require('../orientation/orientationService');
var distanceService = require('../distancemeter/distancemeterService');
var protoBufConfig = require('./../../common/protoBufConfig');
var protoBufHelper = require('./../../common/protoBufHelper');
var client = require('./../../client');

module.exports = {
    processCommand: function (payload) {
        var commandMessage = protoBufHelper.decode(protoBufConfig.message, payload);
        switch (commandMessage.text) {
            case commandEnum.orientation:
                orientationService.getOrientation().then(function (data) {
                    client.publish(topicEnum.orientation, protoBufHelper.encode(protoBufConfig.orientation, data));
                });
                return true;
                break;
            case commandEnum.distance:
                distanceService.readData().then(function (data) {
                    console.log(data);
                    client.publish(topicEnum.distance, protoBufHelper.encode(protoBufConfig.distance, {value: data}));
                });
                return true;
                break;
            default :
                console.warn('Unknown command ' + commandMessage.text);
                return false;
        }
    }
};