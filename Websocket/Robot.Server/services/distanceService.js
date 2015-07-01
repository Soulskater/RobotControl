var protoBuf = require("protobufjs");
var path = require("path");

var builder = protoBuf.loadProtoFile(path.join(__dirname, "../", "proto", "message.proto"));
var Message = builder.build("Message");

function _getDistance() {
    return 10;
}

module.exports = {
    processRequest: function () {
        var data = new Message({
            text: "distance",
            distance: {
                value: _getDistance()
            }
        });
        socketService.send(data);
    }
};