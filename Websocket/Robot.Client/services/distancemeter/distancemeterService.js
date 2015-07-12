var sudo = require('sudo');
var q = require('q');
var path = require('path');

var pythonServoControlFile = path.join(__dirname, '../../python/Distancemeter.py');
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
            var distance = parseFloat(output);
            if (isNaN(distance)) {
                deferred.reject("The measurement is not a number got, " + distance);
            }
            else {
                deferred.resolve(Math.floor(distance));
            }
        });

        return deferred.promise;
    }
};