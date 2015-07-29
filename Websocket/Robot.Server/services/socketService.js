var socketIo = require('socket.io');
var eventEnum = require('../common/enums/eventEnum');
var protoBufConfig = require('../common/protoBufConfig');
var protoBufHelper = require('../common/protoBufHelper');

var _io;

module.exports = {
    createServer: _createServer,
    on: _on,
    emit: _emit
};

function _createServer(httpServer) {
    if (!httpServer) {
        throw Error("Http server is null");
    }
    _io = socketIo.listen(httpServer);
    _io.serveClient(false);

    _onClientConnection();
}

function _on(event, handler) {
    if (!eventEnum[event]) {
        console.error("Unsupported event type " + event);
        return;
    }

    _io.on(event, handler);
}

function _emit(event, data) {
    if (!eventEnum[event]) {
        console.error("Unsupported event type " + event);
        return;
    }
    _io.emit(event, data);
}

function _onClientConnection() {
    _io.on('connection', function (socket) {
        console.log("Client connected", socket.id);

        socket.on("login", function (clientName) {
            socket.clientName = clientName;
            socket.broadcast.emit('clientConnected', clientName);
        });

        socket.on("disconnect", function () {
            console.log("Client disconnected", socket.id, socket.clientName);
            socket.broadcast.emit('clientDisconnected', socket.clientName);
        });

        socket.on(eventEnum.command, function (arrayBuffer) {
            _emit(eventEnum.command, arrayBuffer);
        });
    });
}