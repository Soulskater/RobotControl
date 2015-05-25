angular.module("RobotControl")
    .service("sensorsService", ["$http", function ($http) {

        function _getOrientation() {
            return $http.get("/api/sensors/orientation").then(function (response) {
                return response.data;
            });
        }

        function _getDistancemeterData() {
            return $http.get("/api/sensors/distancemeter").then(function (response) {
                return response.data;
            });
        }

        return {
            getOrientation: _getOrientation,
            getDistancemeterData: _getDistancemeterData,
        };
    }]);