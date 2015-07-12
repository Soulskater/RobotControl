var config = require('./config');
var topicEnum = require('./topicEnum');
var mosca = require('mosca');
var mqtt = require('mqtt');
var q = require('q');
var routerService = require('./services/router/routerService');

var _clientConnectedDeferred = q.defer();

module.exports = {
    start: function () {
        var broker = new mosca.Server(config);
        broker.on('ready', _onReady);
        function _onReady() {
            console.log('[Broker] Ready.');

            var _client = mqtt.connect(config);
            _client.on('connect', function () {
                _client.subscribe(topicEnum.orientation);
                _client.subscribe(topicEnum.distance);
                _clientConnectedDeferred.resolve(_client);
            });

            _client.on("message", function (topic, payload) {
                routerService.routeTopic(topic, payload);
            });
        }
    },
    publish: function (topic, buffer) {
        if (!topicEnum.hasTopic(topic)) {
            console.error("Unregistered topic " + topic);
            return false;
        }
        _clientConnectedDeferred.promise.then(function (client) {
            client.publish(topic, buffer);
        });
    }
};
