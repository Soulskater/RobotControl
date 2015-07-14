var socketService = require('./services/socketService');
var httpServerService = require('./services/httpServerService');
var eventEnum = require('../Robot.Common/enums/eventEnum');
var protoBufConfig = require('../Robot.Common/protoBufConfig');
var protoBufHelper = require('../Robot.Common/protoBufHelper');

// HTTP server
var port = process.env.PORT || 8090;
var server = httpServerService.createServer(port);
socketService.createServer(server);

/*setInterval(function () {
 socketService.emit(eventEnum.command, protoBufHelper.encode(protoBufConfig.command, {
 name: "move",
 subCommand: "forward"
 }));
 }, 2000);*/
