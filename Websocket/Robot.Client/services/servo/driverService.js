var direction = require('./direction');
var sudo = require('sudo');
var q = require('q');
var path = require('path');

var pythonServoControlFile = path.join(__dirname, '../../python/Servo_Control.py');

module.exports = {
    changeDirection: function (direction) {
        var deferred = q.defer();

        var python = sudo(['python', pythonServoControlFile, direction], {
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
            deferred.resolve(output);
        });

        return deferred.promise;
    }
};
