function DbConifg() {
  this.getConnectionString = function() {
    return 'mongodb://admin:admin@ds055862.mongolab.com:55862/fbevents'
  }
}


module.exports = new DbConifg();