var config = require('./config');
var topicEnum = require('./topicEnum');
var mqtt = require('mqtt');
var q = require('q');

var _clientConnectedDeferred = q.defer();

module.exports = {
    connect: function () {
        var _client = mqtt.connect(config);
        _client.on('connect', function () {
            console.log('[Client] Connected to ' + config.host + ":" + config.port);
            _client.subscribe(topicEnum.command);
            _clientConnectedDeferred.resolve(_client);
        });

        _client.on('error', function (error) {
            console.error('[Client] Error occurred', error);
            _clientConnectedDeferred.reject();
        });

        _client.on('reconnect', function () {
            console.warn('[Client] Reconnecting...');
            _clientConnectedDeferred.reject();
        });
    },
    ensureConnected: function () {
        return _clientConnectedDeferred.promise;
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