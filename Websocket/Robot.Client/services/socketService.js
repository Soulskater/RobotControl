var socketIo = require('socket.io-client');
var eventEnum = require('../../Robot.Common/enums/eventEnum');

var protoBufConfig = require('../../Robot.Common/protoBufConfig');
var protoBufHelper = require('../../Robot.Common/protoBufHelper');

var _serverAddress;
var _socket;

module.exports = {
    connect: function (serverAddress) {
        if (!serverAddress) {
            console.error("Server address is required");
        }
        _serverAddress = serverAddress;
        _socket = socketIo(_serverAddress);

        _onConnect();
        _onConnectionError();
        _onReconnectAttempt();
    },
    on: function (event, handler) {
        if (!eventEnum[event]) {
            console.error("Unsupported event type, got " + event);
            return;
        }
        _socket.on(event, handler);
    },
    emit: function (event, data) {
        if (!eventEnum[event]) {
            console.error("Unsupported event type, got " + event);
            return;
        }
        _socket.emit(event, data);
    }
};

function _onConnect() {
    _socket.on('connect', function () {
        console.log("Connected to " + _serverAddress);
    });
}

function _onConnectionError() {
    _socket.on('connect_error', function (error) {
        console.error("Failed to connect!", error);
    });
}

function _onReconnectAttempt() {
    _socket.on('reconnect_attempt', function () {
        console.log("Reconnecting to " + _serverAddress);
    });
}