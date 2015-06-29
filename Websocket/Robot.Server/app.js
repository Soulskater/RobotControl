var http = require("http");
var socketService = require("./services/webSocketService");
var port = 8090;

// HTTP server
var server = http.createServer();
server.listen(port);
server.on("listening", function () {
    console.log("Server started");
    socketService.init(server);
});
server.on("error", function (err) {
    console.log("Failed to start server:", err);
    process.exit(1);
});

