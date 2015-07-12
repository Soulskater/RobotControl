angular.module("RobotControl").constant("protoConfig", {
    command: {
        fileName: "command.proto",
        modelName: "Command"
    },
    telemetry: {
        fileName: "telemetry.proto",
        modelName: "Telemetry"
    }
});
