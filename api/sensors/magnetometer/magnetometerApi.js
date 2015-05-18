var express = require('express');
var router = express.Router();
var magnetometer = require('../../../services/sensors/magnetometer/magnetometerService');

router.get('/', function (req, res) {
    magnetometer.readData()
        .then(function (vector) {
            res.json(vector);
        })
        .fail(function (errorCode) {
            res.status(500).json({
                PythonErrorCode: errorCode
            });
        });
});

router.get('/calibration', function (req, res) {
    res.json(magnetometer.getCalibration());
});
module.exports = router;