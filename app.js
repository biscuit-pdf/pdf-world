var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const userRoute = require('./routes/userRoute.js');
const uploadRoute = require('./routes/uploadRoute.js');
const bookRoute = require('./routes/bookRoute')

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoute);
// app.use(verifyUser.authentication);  
app.use('/book', bookRoute);
app.use('/upload', uploadRoute);

module.exports = app;