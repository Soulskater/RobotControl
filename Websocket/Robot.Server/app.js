var http = require('http');
var socketIo = require('socket.io');
var protoHelper = require('./protoBufHelper');
var protoConfig = require('./protoBufConfig');

// HTTP server
var port = 8090;
var io = socketIo(port);

// Socket IO
io.on('connection', function (socket) {
    console.log("New connection!");

    socket.on('command', function (data) {
        var command = protoHelper.decode(protoConfig.command, data);
        console.log(command.name);
    });
    socket.emit('command', protoHelper.encode(protoConfig.command, {name: "rotate"}));
});
