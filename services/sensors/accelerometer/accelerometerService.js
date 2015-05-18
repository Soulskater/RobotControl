var sudo = require('sudo');
var q = require('q');
var path = require('path');
var vector = require('../../../common/vector');

var pythonServoControlFile = path.join(__dirname, '../../../python/Accelerometer.py');
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
            deferred.resolve(vector(dataArray[0], dataArray[1], dataArray[2]));
        });

        return deferred.promise;
    }
};