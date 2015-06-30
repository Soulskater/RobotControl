angular.module("RobotControl").service("protoBufService", ["protoTypes", function (protoTypes) {
    if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
        throw(new Error("ProtoBuf.js is not loaded"));
    }
    var _protoBuf = dcodeIO.ProtoBuf;
    var protoLoaded = false;
    var loadedProtos = {};

    function _loadProtoFiles() {
        if (protoLoaded) {
            return;
        }
        for (var protoTypeProp in protoTypes) {
            if (protoTypes.hasOwnProperty(protoTypeProp)) {
                var protoType = protoTypes[protoTypeProp];
                _protoBuf.loadProtoFile("./proto/" + protoType.file, function (error, proto) {
                    if (error) {
                        throw(new Error(error));
                    }
                    if (proto) {
                        loadedProtos[protoType.name] = proto.build(protoType.name);
                    }
                });
            }
        }
        protoLoaded = true;
    }

    function _getProto(protoType) {
        if (!protoLoaded) {
            throw(new Error("ProtoBuf files are not loaded"));
        }
        return loadedProtos[protoType.name];
    }

    return {
        protoBuf: _protoBuf,
        loadProtos: _loadProtoFiles,
        getProto: _getProto
    };
}]);