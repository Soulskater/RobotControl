angular.module("RobotControl").controller("dashboardCtrl", ["$scope", "webSocketService", "eventEnum", function ($scope, webSocketService, eventEnum) {
    angular.extend($scope, {
        distance: 30,
        send: function () {
            webSocketService.emit(eventEnum.command, {
                name: "move",
                subCommand: "forward"
            });
        }
    });
    setInterval(function () {
        webSocketService.emit(eventEnum.command, {
            name: "move",
            subCommand: "forward"
        });
    }, 2000);
}]);