var server = require('./server');

var express = require('express');
var path = require('path');
var routeConfig = require('./routeConfig.js');
var app = express();
var routes = routeConfig(app);

app.set('views', path.join(__dirname, 'website/views'));
app.engine('html', require('ejs').renderFile);
routes.createRoutes();

server.start();
module.exports = app;