var socketIo = require('socket.io');
var eventEnum = require('../../Robot.Common/enums/eventEnum');

var _port;
var _io;

module.exports = {
    createServer: function (port) {
        if (!port) {
            console.error("Server port is required");
        }
        _port = port;
        _io = socketIo(port);

        _onClientConnection();
    },
    on: function (event, handler) {
        if (!eventEnum[event]) {
            console.error("Unsupported event type " + event);
            return;
        }
        _io.on(event, handler);
    },
    emit: function (event, data) {
        if (!eventEnum[event]) {
            console.error("Unsupported event type " + event);
            return;
        }
        _io.sockets.emit(event, data);
    }
};

function _onClientConnection() {
    _io.on('connection', function (socket) {
        console.log("Client connected", socket.id);

        socket.on("disconnect", function () {
            console.log("Client disconnected", socket.id);
        });
    });
}