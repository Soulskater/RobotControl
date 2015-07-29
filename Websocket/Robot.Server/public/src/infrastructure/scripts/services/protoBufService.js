angular.module("RobotControl").service("protoBufService", ["protoConfig", function (protoConfig) {
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
        for (var protoTypeProp in protoConfig) {
            if (protoConfig.hasOwnProperty(protoTypeProp)) {
                var protoType = protoConfig[protoTypeProp];
                _protoBuf.loadProtoFile("./proto/" + protoType.fileName, function (error, proto) {
                    if (error) {
                        throw(new Error(error));
                    }
                    if (proto) {
                        var modelName = proto.ptr.children[0].name;
                        loadedProtos[modelName] = proto.build(modelName);
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
        return loadedProtos[protoType.modelName];
    }

    function _encode(protoConfig, data) {
        var proto = _getProto(protoConfig);
        var protoData = new proto(data);
        return protoData.toBuffer();
    }

    function _decode(protoConfig, buffer) {
        var proto = _getProto(protoConfig);
        return proto.decode(buffer);
    }

    return {
        encode: _encode,
        decode: _decode,
        loadProtos: _loadProtoFiles
    };
}]);