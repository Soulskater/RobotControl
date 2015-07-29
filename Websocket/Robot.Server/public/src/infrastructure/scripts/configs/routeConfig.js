angular.module("RobotControl")
    .constant("serviceUrl", {
        baseUrl: "http://localhost:8080/"
    })
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/dashboard', {
                    templateUrl: 'src/components/dashboard/views/dashboard.html',
                    controller: 'dashboardCtrl'
                }).
                otherwise({
                    redirectTo: '/dashboard'
                });
        }]);