angular.module("RobotControl").controller("telemetryCtrl", ["$scope", "webSocketService", "eventEnum", function ($scope, webSocketService, eventEnum) {
    angular.extend($scope, {
        distance: 30,
        isConnected: false,
        isRobotConnected: false
    });

    _init();
    function _init() {
        _init();
        function _init() {
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
    }
}]);