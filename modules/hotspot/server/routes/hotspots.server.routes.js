'use strict';

/**
 * Module dependencies
 */
var hotspotsPolicy = require('../policies/hotspots.server.policy'),
  hotspots = require('../controllers/hotspots.server.controller');

module.exports = function (app) {
  // Hotspots collection routes
  app.route('/api/hotspots').all(hotspotsPolicy.isAllowed)
    .get(hotspots.list)
    .post(hotspots.create);

  // Single hotspot routes
  app.route('/api/hotspots/:hotspotId').all(hotspotsPolicy.isAllowed)
    .get(hotspots.read)
    .put(hotspots.update)
    .delete(hotspots.delete);


  // User's Hotspot session Records
  app.route('/api/hotspots/user/:userId').all(hotspotsPolicy.isAllowed)
      .get(hotspots.listByUser);

  // Finish by binding the hotspot middleware
  app.param('hotspotId', hotspots.hotspotByID);
  app.param('userId', hotspots.hotspotByUserID);
};
