angular.module("RobotControl", ["ngMaterial", "ngRoute"])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .dark(false);
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red');
    })
    .run(function (protoBufService) {
        protoBufService.loadProtos();
    });
