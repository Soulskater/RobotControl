var express = require('express');
var router = express.Router();
var magnetometer = require('../../../services/sensors/accelerometer/accelerometerService');

router.get('/', function (req, res) {
    magnetometer.readData()
        .then(function (output) {
            res.json(JSON.parse(output));
        })
        .fail(function (errorCode) {
            res.status(500).json({
                PythonErrorCode: errorCode
            });
        });
});

module.exports = router;