var express = require('express'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  app = express();


//Configuring global paths
global.__base = __dirname + '/';
global.appPath = __dirname + '/app/';
global.rekuire = function(path) {
  return require(appPath + path);
}

//Load up app config.
rekuire('config/app.config')(app);

//Setup logger
var logger = rekuire('config/logger.config')();


//Setup API
app.use('/api', rekuire('routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  logger.error(err.message);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: true
  });
});

//Catching uncaught exceptions
process.on('uncaughtException', function(err) {
  logger.error('Caught exception: ' + err);
});

//Starting the server.
app.listen(process.env.PORT || 9000, function() {
  logger.info('Environment - ' + app.get('env'));
  logger.info('And.. Lift off!');
});

