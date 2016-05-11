process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');  // load the module into your code

var app = express();
app.listen(3000);
module.exports = app;   // exposes pieces of your code when the module is loaded

console.log('Server running at http://localhost:3000/');