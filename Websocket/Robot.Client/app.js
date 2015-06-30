var socketIo = require('socket.io-client');
var protoHelper = require('./protoBufHelper');
var protoConfig = require('./protoBufConfig');

var _serverAddress = "ws://localhost:8090";
var _socket = socketIo(_serverAddress);

_socket.on('connect', function () {
    console.log("Connected to " + _serverAddress);
});

_socket.on('command', function (data) {
    var command = protoHelper.decode(protoConfig.command, data);
    console.log(command.name);
});

_socket.emit("command", protoHelper.encode(protoConfig.command, {name: "move"}));