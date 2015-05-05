var express = require('express');
var router = express.Router();
var servoDriver = require('../../services/servo/driver');

router.get('/:direction', function (req, res) {
    if (!req.params.direction) {
        throw new Error("Missing direction parameter");
    }
    servoDriver.changeDirection(req.params.direction)
        .then(function (output) {
            res.json({
                PythonOutput: output
            });
        })
        .fail(function (errorCode) {
            res.status(500).json({
                PythonErrorCode: errorCode
            });
        });
});

module.exports = router;