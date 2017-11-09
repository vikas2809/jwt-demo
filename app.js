var express = require('express');
// var app = express();
var body_parser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/ServerTokenDemo');

var app=module.exports=express();

app.set('env',process.env.NODE_ENV || 'production');

app.use(body_parser.urlencoded({ extended : true}));

app.use(body_parser.json());

routes=require('./routes/routes');
app.use('/api',routes);


var port = process.env.PORT || 7000;


//starting the server
app.listen(port);
console.log('Server starts on port ' + port);