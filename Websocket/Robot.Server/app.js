var socketService = require('./services/socketService');
var eventEnum = require('../Robot.Common/enums/eventEnum');
var protoBufConfig = require('../Robot.Common/protoBufConfig');
var protoBufHelper = require('../Robot.Common/protoBufHelper');

// HTTP server
var port = 8090;
socketService.createServer(port);
setInterval(function () {
    socketService.emit(eventEnum.command, protoBufHelper.encode(protoBufConfig.command, {
        name: "move",
        subCommand: "forward"
    }));
}, 2000);