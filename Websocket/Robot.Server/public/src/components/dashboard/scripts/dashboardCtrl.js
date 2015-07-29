angular.module("RobotControl").controller("dashboardCtrl", ["$scope", "webSocketService", "eventEnum", function ($scope, webSocketService, eventEnum) {
    angular.extend($scope, {
        distance: 30,
        isConnected: false,
        isRobotConnected: false
    });

    _init();
    function _init() {
        webSocketService.connect();
        webSocketService.onConnected(function () {
            $scope.isConnected = true;
        });

        webSocketService.onDisconnected(function () {
            $scope.isConnected = false;
        });

        webSocketService.onClientConnected(function () {
            $scope.isRobotConnected = true;
        });

        webSocketService.onClientDisconnected(function () {
            $scope.isRobotConnected = false;
        });
    }
}]);