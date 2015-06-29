var protoBuf = require("protobufjs");
var ws = require("ws");
var routeService = require("./routeService");
var path = require("path");

var wss;
var _socket;
var builder = protoBuf.loadProtoFile(path.join(__dirname, "../", "proto", "message.proto"));
var Message = builder.build("Message");

module.exports = {
    init: function (server) {
        wss = new ws.Server({server: server});
        if (!wss) {
            throw new Error("Websocket should be initialized");
            return;
        }
        wss.on("connection", function (socket) {
            console.log("New WebSocket connection");
            _socket = socket;
            socket.on("close", function () {
                console.log("WebSocket disconnected");
            });
            socket.on("message", function (data, flags) {
                if (flags.binary) {
                    try {
                        var message = Message.decode(data);
                        if (!message) {
                            console.error("Invalid data");
                            return;
                        }
                        routeService.route(message.text);
                    } catch (err) {
                        console.error("Processing failed:", err);
                    }
                } else {
                    console.error("Not binary data");
                }
            });
        });
    },
    send: function (data) {
        _socket.send(data.toBuffer());
    }
};