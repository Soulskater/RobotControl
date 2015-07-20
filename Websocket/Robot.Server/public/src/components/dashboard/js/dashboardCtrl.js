angular.module("RobotControl").controller("dashboardCtrl", ["$scope", "webSocketService", "eventEnum", function ($scope, webSocketService, eventEnum) {
    angular.extend($scope, {
        distance: 30,
        onForwardStart: function () {
            webSocketService.emit(eventEnum.command, {
                name: "move",
                subCommand: "forward"
            });
        },
        onForwardStop: function () {
            webSocketService.emit(eventEnum.command, {
                name: "move",
                subCommand: "none"
            });
        }
    });
}]);