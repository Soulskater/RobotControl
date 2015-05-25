var client = require('./client');
var routerService = require('./services/router/routerService');

client.connect();
client.ensureConnected().then(function (connectedClient) {
    connectedClient.on("message", function (topic, payload) {
        routerService.routeTopic(topic, payload);
    })
});