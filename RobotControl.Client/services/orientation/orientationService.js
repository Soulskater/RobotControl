var sudo = require('sudo');
var q = require('q');
var path = require('path');

var pythonServoControlFile = path.join(__dirname, '../../python/orientation.py');
module.exports = {
    getOrientation: function () {
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
            deferred.resolve({
                roll: Math.floor(dataArray[0]),
                pitch: Math.floor(dataArray[1]),
                heading: Math.floor(dataArray[2])
            });
        });

        return deferred.promise;
    }
};