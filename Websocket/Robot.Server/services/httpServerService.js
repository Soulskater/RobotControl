var connect = require('connect');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var path = require('path');

var _port;

module.exports = {
    createServer: function (port) {
        _port = port;
        var app = connect();
        app.use(_serveStatic())
        app.use(morgan("dev"));
        return app.listen(port);
    }
};

function _serveStatic() {
    var publicUrl = path.join(__dirname, "../public");
    return serveStatic(publicUrl, {'index': ['index.html']});
}