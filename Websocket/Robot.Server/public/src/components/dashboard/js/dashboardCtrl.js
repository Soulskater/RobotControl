angular.module("RobotControl").controller("dashboardCtrl", ["$scope", "webSocketService", "eventEnum", function ($scope, webSocketService, eventEnum) {
    angular.extend($scope, {
        distance: 30,
        isConnected: false
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
    }

    function _connectClick() {
    }
}]);