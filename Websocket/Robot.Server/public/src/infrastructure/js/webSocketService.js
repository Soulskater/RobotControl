angular.module("RobotControl").service("webSocketService", ["protoConfig", "serverConfig", "protoBufService", "eventEnum", "eventService", function (protoConfig, serverConfig, protoBufService, eventEnum, eventService) {

    var _socketServer = null;
    var _customEvents = {
        socketStarted: "socketStarted",
        connected: "connected",
        disconnected: "disconnected",
        clientConnected: "clientConnected",
        clientDisconnected: "clientDisconnected"
    };
    var _emitter = new eventService.emitter();

    return {
        onCustomEvent: _onCustomEvent,
        onSocketStarted: _onSocketStarted,
        onClientConnected: _onClientConnected,
        onClientDisconnected: _onClientDisconnected,
        onConnected: _onConnected,
        onDisconnected: _onDisconnected,
        emit: _emit,
        connect: _connect
    };

    function _emit(event, data) {
        if (_socketServer && _socketServer.connected) {
            var buffer = protoBufService.encode(protoConfig[event], data);
            if (!buffer) {
                throw Error("Not supported event type " + event);
            }
            _socketServer.emit(event, buffer);
            console.log("Sent", data);
        } else {
            console.log("Client not connected");
        }
    }

    function _connect() {
        _socketServer = io(serverConfig.serverAddress);
        _socketServer.on('connect', function () {
            _socketServer.emit("login", "website");
            console.log("Connected to the server");
            _emitter.emitEvent(_customEvents.connected);
        });
        _socketServer.on(_customEvents.clientConnected, function (clientName) {
            if (clientName === "website") {
                return;
            }
            console.log(clientName, "connected to the server");
            _emitter.emitEvent(_customEvents.clientConnected);
        });
        _socketServer.on(_customEvents.clientDisconnected, function (clientName) {
            console.log(clientName, "disconnected to the server");
            _emitter.emitEvent(_customEvents.clientDisconnected);
        });
        _socketServer.on('disconnect', function () {
            console.log("Disconnected from the server");
            _socketServer.emit("logout", "website");
            _emitter.emitEvent(_customEvents.disconnected);
        });
    }

    function _onSocketStarted(handler) {
        _emitter.addListener(_customEvents.socketStarted, handler);
    }

    function _onConnected(handler) {
        _emitter.addListener(_customEvents.connected, handler);
    }

    function _onDisconnected(handler) {
        _emitter.addListener(_customEvents.disconnected, handler);
    }

    function _onClientConnected(handler) {
        _emitter.addListener(_customEvents.clientConnected, handler);
    }

    function _onClientDisconnected(handler) {
        _emitter.addListener(_customEvents.clientDisconnected, handler);
    }

    function _onCustomEvent(event, handler) {
        if (!_socketServer) {
            return;
        }
        if (!eventEnum[event]) {
            console.error("Unsupported event type " + event);
            return;
        }

        _emitter.addListener(event, handler);
        _socketServer.on(event, function (arrayBuffer) {
            _emitter.emitEvent(event, protoBufService.decode(protoConfig[event], arrayBuffer));
        });
    }
}]);