var magnetometer = require('../sensors/magnetometer/magnetometer');
var accelerometer = require('../sensors/accelerometer/accelerometer');
var vector = require('../../common/vector');
var q = require('q');
var path = require('path');

var fg = vector(0, 0, 0);
var fm = vector(0, 0, 0);
module.exports = {
    getHeading: function (fromVector) {
        var deferred = q.defer();
        q.all([magnetometer.readData(), accelerometer.readData()]).spread(function (magData, accData) {
            var mag = magData;
            var magCalibration = magnetometer.getCalibration();
            var acc = accData;

            var temp_mag = mag.clone();
            var alpha = 0.5;

            // subtract offset (average of min and max) from magnetometer readings
            temp_mag.x -= (magCalibration.min.x + magCalibration.max.x) / 2;
            temp_mag.y -= (magCalibration.min.y + magCalibration.max.y) / 2;
            temp_mag.z -= (magCalibration.min.z + magCalibration.max.z) / 2;

            //low pass filter on acc
            fg.x = acc.x * alpha + (fg.x * (1.0 - alpha));
            fg.y = acc.y * alpha + (fg.y * (1.0 - alpha));
            fg.z = acc.z * alpha + (fg.z * (1.0 - alpha));

            //low pass filter on mag
            fm.x = temp_mag.x * alpha + (fm.x * (1.0 - alpha));
            fm.y = temp_mag.y * alpha + (fm.y * (1.0 - alpha));
            fm.z = temp_mag.z * alpha + (fm.z * (1.0 - alpha));

            // compute E and N
            var e = fm.cross(acc);
            e = e.normalize();
            var n = acc.cross(e);
            n = n.normalize();

            // compute heading
            var heading = Math.atan2(e.dot(fromVector), n.dot(fromVector)) * 180 / Math.PI;
            if (heading < 0) heading += 360;
            deferred.resolve(heading);
        });
        return deferred.promise;
    },
    getPitch: function () {
        var deferred = q.defer();
        var alpha = 0.5;
        accelerometer.readData().then(function (accData) {
            //Low Pass Filter
            fg.x = accData.x * alpha + (fg.x * (1.0 - alpha));
            fg.y = accData.y * alpha + (fg.y * (1.0 - alpha));
            fg.z = accData.z * alpha + (fg.z * (1.0 - alpha));

            //Roll & Pitch Equations
            //var roll = (atan2(-fYg, fZg) * 180.0) / M_PI;
            var pitch = (Math.atan2(fg.x, Math.sqrt(fg.y * fg.y + fg.z * fg.z)) * 180.0) / Math.PI;
            deferred.resolve(pitch);
        });
        return deferred.promise;
    },
    getRoll: function () {
        var deferred = q.defer();
        var alpha = 0.5;
        accelerometer.readData().then(function (accData) {
            //Low Pass Filter
            fg.x = accData.x * alpha + (fg.x * (1.0 - alpha));
            fg.y = accData.y * alpha + (fg.y * (1.0 - alpha));
            fg.z = accData.z * alpha + (fg.z * (1.0 - alpha));

            //Roll & Pitch Equations
            var roll = (Math.atan2(-fg.y, fg.z) * 180.0) / Math.PI;
            deferred.resolve(roll);
        });
        return deferred.promise;
    }
};