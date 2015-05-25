angular.module("RobotControl")
    .controller("MainCtrl", ['$scope', '$interval', 'sensorsService', function ($scope, $interval, $sensors) {
        angular.extend($scope, {
            distance: 0,
            orientation: {},
            pollPromise: null,
            distancePollPromise: null,
            stopPolling: _stopPolling,
            startPolling: _startPolling,
            calculateWifiDistance: function (signalLevel, frequency) {
                var exp = (27.55 - (20 * Math.log10(frequency)) + Math.abs(signalLevel)) / 20.0;
                $scope.distanceFromWifi = Math.pow(10.0, exp);
            }
        });

        function _startPolling() {
            $scope.pollPromise = $interval(_polling, 500);
        }

        function _stopPolling() {
            $interval.cancel($scope.pollPromise);
        }

        function _polling() {
            $sensors.getOrientation().then(function (data) {
                $scope.orientation = data;
            });
        }

        function _startPollingDistanceMeter() {
            //$scope.distancePollPromise = $interval(_pollingDistancemeter, 500);
        }

        function _stopPollingDistanceMeter() {
            $interval.cancel($scope.distancePollPromise);
        }

        function _pollingDistancemeter() {
            $sensors.getDistancemeterData().then(function (data) {
                $scope.distance = data;
            });
        }
    }]);