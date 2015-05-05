angular.module("RobotControl")
    .controller("MainCtrl", ['$scope', '$interval', 'sensorsService', function ($scope, $interval, $sensors) {
        $scope.magnetometerData = {
            x: 0,
            y: 0,
            z: 0
        };
        $scope.accelerometerData = {
            x: 0,
            y: 0,
            z: 0
        };
        $scope.calibration = {};
        $scope.heading = 0;
        $scope.pitch = 0;
        $scope.roll = 0;
        $scope.magneticDeclination = 4;
        $scope.compassPollPromise = null;
        $scope.stopPolling = _stopPolling;
        $scope.startPolling = _startPolling;

        function _startPolling() {
            $scope.compassPollPromise = $interval(_pollingCompass, 500);
        }

        function _stopPolling() {
            $interval.cancel($scope.compassPollPromise);
        }

        function _pollingCompass() {
            $sensors.getCalibration().then(function (data) {
                $scope.calibration = data;
            });

            $sensors.getHeading().then(function (data) {
                $scope.heading = Math.floor(data.heading) + $scope.magneticDeclination;
            });

            $sensors.getPitch().then(function (data) {
                $scope.pitch = Math.floor(data.pitch);
            });

            $sensors.getRoll().then(function (data) {
                $scope.roll = Math.floor(data.roll);
            });
        }
    }]);