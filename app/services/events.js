var mongo = new require('mongojs');
var dbConfig = require('../config/db.config.js');
var db = mongo(dbConfig.getConnectionString());
var events = db.collection('events');
var q = require('q');
var logger = require('winston');



function EventService() {

  this.addOrUpdate = function(obj) {
    if(!obj) return q.reject('Invalid Request');

    var deferred = q.defer();
    events.findAndModify({
      query: { "eventId": obj.eventId },
      update: { $set: obj },
      new: true,
      upsert: true
    }, function(err, doc, lastErrorObject) {
      if(err) {
        logger.error(err);
        deferred.reject('Error Occurred');
      } else {
        deferred.resolve(lastErrorObject.updatedExisting ? 'Updated Successfully' : 'Saved Successfully');
      }
    });

    return deferred.promise;
  }

}

module.exports = new EventService();


