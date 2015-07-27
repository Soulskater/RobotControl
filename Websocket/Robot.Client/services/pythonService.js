var sudo = require('sudo');
var q = require('q');

module.exports = {
    runScript: function (filePath, param) {
        var deferred = q.defer();
        var pythonProcess = sudo(['python', filePath, param], {
            cachePassword: true
        });
        var output = "";
        pythonProcess.stdout.on('data', function (data) {
            output += data;
            console.log("Python process data", data.toString());
        });
        pythonProcess.on('exit', function (code) {
            console.log("Python process exited", code);
            if (code !== 0) {
                deferred.reject(code);
            }
            deferred.resolve(output);
        });

        return deferred.promise;
    }
};
