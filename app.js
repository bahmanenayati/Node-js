var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');
var app = express();

//Database connection
const mongoose = require('mongoose');
const dbConfig = config.get('dbConfig');
mongoose.connect(`${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, {useNewUrlParser: true});

//Routers
var indexRouter = require('./routes/Index');
var userRouter = require('./routes/User');
app.use('/', indexRouter);
app.use('/user', userRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
