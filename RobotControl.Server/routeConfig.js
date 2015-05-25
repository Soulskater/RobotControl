var express = require('express');

var apiRoutes = [
    {
        path: '/api/sensors/orientation/',
        content: require('./api/orientation/orientationApi')
    }
];

module.exports = function (app) {
    function _staticRouting() {
        app.use('/website/views', express.static(__dirname + '/website/views/'));
        app.use('/website/js', express.static(__dirname + '/website/js/'));
        app.use('/website/packages', express.static(__dirname + '/website/packages/'));
        app.use('/website/css', express.static(__dirname + '/website/css/'));
        app.use('/website/fonts', express.static(__dirname + '/website/fonts/'));
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
