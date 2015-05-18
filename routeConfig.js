var express = require('express');

var apiRoutes = [
    {
        path: '/api/servo/control',
        content: require('./api/servo/control')
    },
    {
        path: '/api/sensors/magnetometer/',
        content: require('./api/sensors/magnetometer/magnetometerApi')
    },
    {
        path: '/api/sensors/accelerometer/',
        content: require('./api/sensors/accelerometer/accelerometerApi')
    },
    {
        path: '/api/sensors/distancemeter/',
        content: require('./api/sensors/distancemeter/distancemeterApi')
    },
    {
        path: '/api/sensors/compass/',
        content: require('./api/compass/compassApi')
    }
];

module.exports = function (app) {
    function _staticRouting() {
        app.use('/website/views', express.static(__dirname + '/website/views/'));
        app.use('/website/js', express.static(__dirname + '/website/js/'));
        app.use('/website/packages', express.static(__dirname + '/website/packages/'));
        app.use('/website/css', express.static(__dirname + '/website/css/'));
        app.get('/website', function (req, res) {
            res.sendFile(__dirname + '/website/views/index.html');
        });
    }

    function _apiRouting() {
        for (var i = 0, len = apiRoutes.length; i < len; i++) {
            var route = apiRoutes[i];
            app.use(route.path, route.content);
        }
    }

    return {
        createRoutes: function () {
            _staticRouting();
            _apiRouting();
        }
    };
};
