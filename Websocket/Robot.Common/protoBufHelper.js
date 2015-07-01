var path = require('path');
var protoBuf = require('protobufjs');

module.exports = {
    encode: function (protoConfig, data) {
        var builder = _loadProtoBuilder(protoConfig.fileName);
        var protoModel = builder.build(protoConfig.modelName);

        return new protoModel(data).toBuffer();
    },
    decode: function (protoConfig, buffer) {
        var builder = _loadProtoBuilder(protoConfig.fileName);
        var protoModel = builder.build(protoConfig.modelName);
        return protoModel.decode(buffer);
    }
};

function _loadProtoBuilder(fileName) {
    return protoBuf.loadProtoFile(path.join(__dirname, "./protos/", fileName));
}