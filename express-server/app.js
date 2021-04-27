var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var myMongoose = require('./database/my-mongoose');
var infosRouter = require('./routes/infos');
var customLog = require('./logService');

customLog('server start');

myMongoose.connect();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views/dist/your-vocabulary-book-angular-view')));

app.use('/api', infosRouter);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/dist/your-vocabulary-book-angular-view/index.html'));
});

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
