var express = require('express');
import * as path from "path";
var createError = require('http-errors');
var logger = require('morgan');
var passport = require('passport');

require('./database/config');
require('./auth/config.google');
require('./auth/config.jwt');

var customLog = require('./logService');

customLog('server start');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../public/your-vocabulary-book-angular-view')));

app.use('/api', require('./routes/infos'));
app.use('/auth', require('./routes/auth'));
app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../public/your-vocabulary-book-angular-view/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(JSON.stringify(err)); // res.render('error');
});

module.exports = app;
