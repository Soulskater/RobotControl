var express = require('express');
var router = express.Router();
var vector = require('../../common/vector');
var compassService = require('../../services/compass/compassService');

router.get('/', function (req, res) {
    compassService.getHeading(vector(0, -1, 0))
        .then(function (heading) {
            res.json({
                heading: heading
            });
        })
        .fail(function (error) {
            res.status(500).json({
                Error: error
            });
        });
});

router.get('/pitch', function (req, res) {
    compassService.getPitch()
        .then(function (pitch) {
            res.json({
                pitch: pitch
            });
        })
        .fail(function (error) {
            res.status(500).json({
                Error: error
            });
        });
});

router.get('/roll', function (req, res) {
    compassService.getRoll()
        .then(function (roll) {
            res.json({
                roll: roll
            });
        })
        .fail(function (error) {
            res.status(500).json({
                Error: error
            });
        });
});

module.exports = router;
