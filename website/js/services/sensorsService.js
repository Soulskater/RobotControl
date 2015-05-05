angular.module("RobotControl")
    .service("sensorsService", ["$http", function ($http) {
        function _getMagnetometerData() {
            return $http.get("/api/sensors/magnetometer").then(function (response) {
                return {
                    x: response.data[0],
                    y: response.data[1],
                    z: response.data[2]
                };
            });
        }

        function _getCalibration() {
            return $http.get("/api/sensors/magnetometer/calibration").then(function (response) {
                return response.data;
            });
        }

        function _getAccelerometerData() {
            return $http.get("/api/sensors/accelerometer").then(function (response) {
                return {
                    x: response.data[0],
                    y: response.data[1],
                    z: response.data[2]
                };
            });
        }

        function _getHeading() {
            return $http.get("/api/sensors/compass").then(function (response) {
                return response.data;
            });
        }

        function _getPitch() {
            return $http.get("/api/sensors/compass/pitch").then(function (response) {
                return response.data;
            });
        }

        function _getRoll() {
            return $http.get("/api/sensors/compass/roll").then(function (response) {
                return response.data;
            });
        }

        return {
            getMagnetometerData: _getMagnetometerData,
            getCalibration: _getCalibration,
            getAccelerometerData: _getAccelerometerData,
            getHeading: _getHeading,
            getPitch: _getPitch,
            getRoll: _getRoll
        };
    }]);