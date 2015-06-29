var express = require('express');
var router = express.Router();
var topicEnum = require('./../../topicEnum');
var server = require('./../../server');
var protoBufConfig = require('./../../common/protoBufConfig');
var protoBufHelper = require('./../../common/protoBufHelper');
var distance = require('./../../services/telemetry/distance');

router.get('/', function (req, res) {
    server.publish(topicEnum.command, protoBufHelper.encode(protoBufConfig.message, {text: "distance"}));
    distance.onDataReceived(function (data) {
        res.json(data);
    });
});

module.exports = router;