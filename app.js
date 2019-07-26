var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rfs = require('rotating-file-stream');
var AirbrakeClient = require('airbrake-js');
const config = require('config');

// //Database connection
// const mongoose = require('mongoose');
// const dbConfig = config.get('dbConfig');
// mongoose.connect(`${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {
//     useNewUrlParser: true,
//     useFindAndModify: true
// });


var indexRouter = require('./routes/Index');
var userRouter = require('./routes/User');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs')
})

// setup the logger
app.use(logger('combined', {stream: accessLogStream}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res,) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

new AirbrakeClient({
    projectId: 236804,
    projectKey: '8726167a38a51eba564998c9130abd80'
});
module.exports = app;
