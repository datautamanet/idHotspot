'use strict';

/**
 * Module dependencies
 */
var inetlogsPolicy = require('../policies/inetlogs.server.policy'),
  inetlogs = require('../controllers/inetlogs.server.controller');

module.exports = function (app) {
  // InetLogs collection routes
  app.route('/api/inetlogs').all(inetlogsPolicy.isAllowed)
    .get(inetlogs.list)
    .post(inetlogs.create);

  // Single inetlog routes
  app.route('/api/inetlogs/:inetlogId').all(inetlogsPolicy.isAllowed)
    .get(inetlogs.read)
    .put(inetlogs.update)
    .delete(inetlogs.delete);

  // Finish by binding the inetlog middleware
  app.param('inetlogId', inetlogs.inetlogByID);
};
