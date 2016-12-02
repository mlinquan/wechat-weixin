'use strict';

var fs = require('fs');
var path = require('path');
var files = fs.readdirSync(__dirname);
var apis = {};

files.forEach(function (api_name) {
  if (['index.js', 'errors.js', 'api_limit.js'].indexOf(api_name) !== -1) {
    return;
  }
  if (!/\.js$/.test(api_name)) {
    return;
  }
  var module_name = 'init' + api_name.replace(/\.js$/, '');
  var module_path = path.join(__dirname, api_name);
  apis[module_name] = require(module_path);
});

module.exports = apis;