angular.module("RobotControl", ["ngMaterial", "ngRoute"])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .dark(false);
    })
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');
    })
    .run(function (protoBufService) {
        protoBufService.loadProtos();
    });
