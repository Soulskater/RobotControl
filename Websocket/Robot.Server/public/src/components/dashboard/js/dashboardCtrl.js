angular.module("RobotControl").controller("dashboardCtrl", ["$scope", "webSocketService", function ($scope, webSocketService) {
    angular.extend($scope, {
        distance: 30,
        send: function () {
            webSocketService.send({text: "distance"});
        }
    });
}]);