var express = require('express');
var router = express.Router();
var distanceMeter = require('../../../services/sensors/distancemeter/distancemeterService');

router.get('/', function (req, res) {
    distanceMeter.readData()
        .then(function (distance) {
            res.json(distance);
        })
        .fail(function (error) {
            res.status(500).json({
                Error: error
            });
        });
});

module.exports = router;