var socketService = require('./services/socketService');
var httpServerService = require('./services/httpServerService');
var eventEnum = require('./common/enums/eventEnum');
var protoBufConfig = require('./common/protoBufConfig');
var protoBufHelper = require('./common/protoBufHelper');

// HTTP server
var port = process.env.PORT || 8090;
var server = httpServerService.createServer(port);
socketService.createServer(server);