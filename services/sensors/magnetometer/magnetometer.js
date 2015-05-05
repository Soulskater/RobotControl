var sudo = require('sudo');
var q = require('q');
var path = require('path');
var vector = require('../../../common/vector');

var pythonServoControlFile = path.join(__dirname, '../../../python/Magnetometer.py');

/*var configuration = {
 min: {x: 2047, y: 2047, z: 2047},
 max: {x: -2048, y: -2048, z: -2048},
 calibrated: false
 };*/

var _min = vector(-614, -470, -570);
var _max = vector(391, 448, 431);

module.exports = {
    readData: function () {
        var deferred = q.defer();

        var python = sudo(['python', pythonServoControlFile], {
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

            _min.x = Math.min(_min.x, dataArray[0]);
            _min.y = Math.min(_min.y, dataArray[1]);
            _min.z = Math.min(_min.z, dataArray[2]);

            _max.x = Math.max(_max.x, dataArray[0]);
            _max.y = Math.max(_max.y, dataArray[1]);
            _max.z = Math.max(_max.z, dataArray[2]);
            deferred.resolve(vector(dataArray[0], dataArray[1], dataArray[2]));
        });

        return deferred.promise;
    },
    getCalibration: function () {
        return {
            min: _min,
            max: _max
        }
    }
};