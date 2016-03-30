'use strict';

var ENV = process.env.NODE_ENV || 'development';
var config = require('./environments/'+ENV.toLowerCase());

//it will export the configuration object found in development.js
module.exports = config;