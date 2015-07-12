angular.module("RobotControl").service("webSocketService", ["protoConfig", "serverConfig", "protoBufService", "eventEnum", function (protoConfig, serverConfig, protoBufService, eventEnum) {

    var socketServer = io(serverConfig.serverAddress);

    function _emit(event, data) {
        if (socketServer.connected) {
            var buffer = protoBufService.encode(protoConfig[event], data);
            if (!buffer) {
                throw Error("Not supported event type " + event);
            }
            socketServer.emit(event, buffer);
            console.log("Sent", data);
        } else {
            console.log("Client not connected");
        }
    }

    socketServer.on('connect', function () {
        console.log("Connected to the server");
    });
    socketServer.on('disconnect', function () {
        console.log("Disconnected from the server");
    });

    return {
        emit: _emit,
        on: function (event, handler) {
            if (!eventEnum[event]) {
                console.error("Unsupported event type " + event);
                return;
            }
            socketServer.on(event, function (arrayBuffer) {
                handler(protoBufService.decode(protoConfig[event], arrayBuffer));
            });
        }
    };
}]);