//Logger Configuration Module.
module.exports = function() {
  var logger = require('winston');

  //Setting exitOnError property
  logger.exitOnError = false;

  //Setting up colors for each level
  logger.addColors({debug: 'green',info: 'cyan',silly: 'magenta',warn: 'yellow',error: 'red'});

  //Removing current console logger and replacing with new colorized console logger.
  logger.remove(logger.transports.Console);

  //Setting up logger for file.
  if(process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'staging' || !process.env.NODE_ENV) {
    //Set up only in development environment.
    logger.add(logger.transports.Console, { level: 'debug', colorize:true });
  } 

  if(process.env.NODE_ENV === 'production') {
    //Set up only in production or staging environment.
    logger.add(logger.transports.Console, { level: 'info', colorize:true });
  }
  logger.add(logger.transports.File, {
    level: 'warn',
    filename: 'app/logs/app.log',
    handleExceptions: true
  });

  return logger;
};