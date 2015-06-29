angular.module("RobotControl").service("webSocketService", ["protoTypes", "serverConfig", "protoBufService", function (protoTypes, serverConfig, protoBufService) {

    var socket = new WebSocket(serverConfig.serverAddress);
    socket.binaryType = "arraybuffer";
    function _send(data) {
        if (socket.readyState == WebSocket.OPEN) {
            var proto = protoBufService.getProto(protoTypes.message);
            var dataToSend = new proto(data);
            socket.send(dataToSend.toArrayBuffer());
            console.log("Sent: " + data);
        } else {
            console.log("Not connected");
        }
    }

    socket.onopen = function () {
        console.log("Connected");
    };
    socket.onclose = function () {
        console.log("Disconnected");
    };

    socket.onmessage = function (evt) {
        try {
            // Decode the Message
            var proto = protoBufService.getProto(protoTypes.message);
            var msg = proto.decode(evt.data);
            console.log("Received: " + msg);
        } catch (err) {
            console.log("Error: " + err);
        }
    };

    return {
        send: _send
    };
}]);