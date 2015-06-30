angular.module("RobotControl", ["ngMaterial", "ngRoute"])
    .run(function (protoBufService) {
        protoBufService.loadProtos();
    });
