var q = require('q');
var protoBufConfig = require('./../../common/protoBufConfig');
var protoBufHelper = require('./../../common/protoBufHelper');

var _subscriber;

module.exports = {
    dataReceived: function (buffer) {
        var data = protoBufHelper.decode(protoBufConfig.distance, buffer);
        if (_subscriber)
            _subscriber(data.value);
    },
    onDataReceived: function (subscriber) {
        _subscriber = subscriber;
    }
};