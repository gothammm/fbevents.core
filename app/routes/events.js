var logger = require('winston');
var eventService = require('../services/events.js');

module.exports = function(router) {
  
  router
  .route('/events')
  //post request
  .post(function(req, res) {
    var data = req.body;
    if(!data) {
      res.status(402);
      res.json({
        message: 'Invalid Request',
        error: true
      });
    }

    eventService
    .addOrUpdate(data)
    .then(function(msg) {
      res.json({
        message: msg,
        success: true
      });
    })
    .catch(function(err) {
      res.json({
        message: err,
        success: true
      });
    });
  });

  return router;
}