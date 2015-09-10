var cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser');
 
module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set('json spaces', 4);

  function getBuildVersion() {
    var packageConfig = require(__base + 'package.json');
    if(packageConfig) {
      return packageConfig.version;
    }
    return null;
  }

  function setResponseHeaders(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, sl-authorization');
  }
  
  //Setting up CORS config.
  app.all('*', function(req, res, next) {
    setResponseHeaders(req, res);
    next();
  });
  
  //Setting up OPTIONS request.
  app.options('*', function(req, res) {
    res.send(200);
  });

  app.get('/api/v1/build/details', function(req, res) {
    var buildVersion = getBuildVersion();
    res.json({ 
      build: buildVersion
    });
  });
};