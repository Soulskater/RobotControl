var sudo = require('sudo');
var q = require('q');
var path = require('path');

var pythonPaths = {
    telemetry: "telemetry.py"
};

function _getTelemetryData() {
    var pythonFile = path.join(__dirname, '../../python', pythonPaths.telemetry);
    var deferred = q.defer();

    var python = sudo(['python', pythonFile], {
        cachePassword: true
    });
    var output = "";
    python.stdout.on('data', function (data) {
        output += data
    });
    python.on('close', function (code) {
        if (code !== 0) {
            deferred.reject(code);
        }
        var dataArray = JSON.parse(output);
        deferred.resolve({
            roll: Math.floor(dataArray[0]),
            pitch: Math.floor(dataArray[1]),
            heading: Math.floor(dataArray[2]),
            distance: Math.floor(dataArray[3])
        });
    });

    return deferred.promise;
}

module.exports = {
    getTelemetryData: _getTelemetryData
};