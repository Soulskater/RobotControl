angular.module("RobotControl")
    .controller("MainCtrl", ['$scope', '$interval', 'sensorsService', function ($scope, $interval, $sensors) {
        angular.extend($scope, {
            magnetometerData: {
                x: 0,
                y: 0,
                z: 0
            },
            accelerometerData: {
                x: 0,
                y: 0,
                z: 0
            },
            calibration: {},
            heading: 0,
            pitch: 0,
            roll: 0,
            distance: 0,
            magneticDeclination: 4,
            compassPollPromise: null,
            distancePollPromise: null,
            stopPollingCompass: _stopPollingCompass,
            startPollingCompass: _startPollingCompass,
            stopPollingDistanceMeter: _stopPollingDistanceMeter,
            startPollingDistanceMeter: _startPollingDistanceMeter,
            signalLevel: 0,
            frequency: 0,
            distanceFromWifi: 0,
            calculateWifiDistance: function (signalLevel, frequency) {
                var exp = (27.55 - (20 * Math.log10(frequency)) + Math.abs(signalLevel)) / 20.0;
                $scope.distanceFromWifi = Math.pow(10.0, exp);
            }
        });

        function _startPollingCompass() {
            $scope.compassPollPromise = $interval(_pollingCompass, 500);
            $scope.distancePollPromise = $interval(_pollingDistancemeter, 500);
        }

        function _stopPollingCompass() {
            $interval.cancel($scope.compassPollPromise);
        }


        function _startPollingDistanceMeter() {
            $scope.distancePollPromise = $interval(_pollingDistancemeter, 500);
        }

        function _stopPollingDistanceMeter() {
            $interval.cancel($scope.distancePollPromise);
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

            $sensors.getDistancemeterData().then(function (data) {
                $scope.distance = data;
            });
        }

        function _pollingDistancemeter() {
            $sensors.getDistancemeterData().then(function (data) {
                $scope.distance = data;
            });
        }
    }]);