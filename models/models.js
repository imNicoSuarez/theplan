var mongoose = require('../lib/db.js')();

// Models
var models = {
  user : require('./user')(mongoose),
  accessToken: require('./access_token')(mongoose),
  client: require('./clients')(mongoose),
  client_planification: require('./client_planification')(mongoose),
  planification: require('./planification')(mongoose),
  task: require('./tasks')(mongoose),
  people: require('./peoples')(mongoose),
}

module.exports = models;