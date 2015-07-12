angular.module("RobotControl")
    .service("sensorsService", ["$http", function ($http) {

        function _getOrientation() {
            return $http.get("/api/sensors/orientation").then(function (response) {
                return response.data;
            });
        }

        function _getDistance() {
            return $http.get("/api/sensors/distance").then(function (response) {
                return response.data;
            });
        }

        return {
            getOrientation: _getOrientation,
            getDistance: _getDistance
        };
    }]);