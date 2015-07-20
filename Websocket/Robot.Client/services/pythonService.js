var sudo = require('sudo');
var q = require('q');

module.exports = {
    runScript: function (filePath, param) {
        var deferred = q.defer();
        console.log(filePath, param);
        var python = sudo(['python', filePath, param], {
            cachePassword: true
        });
        var output = "";
        python.stdout.on('data', function (data) {
            output += data
        });
        python.on('close', function (code, param1, param2) {
            console.log(code, param1, param2);
            if (code !== 0) {
                deferred.reject(code);
            }
            deferred.resolve(output);
        });

        return deferred.promise;
    }
};
