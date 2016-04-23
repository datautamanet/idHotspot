'use strict';

/**
 * Module dependencies
 */
var nodesPolicy = require('../policies/nodes.server.policy'),
  nodes = require('../controllers/nodes.server.controller');

module.exports = function (app) {
  // Nodes collection routes
  app.route('/api/nodes').all(nodesPolicy.isAllowed)
    .get(nodes.list)
    .post(nodes.create);

  // Single node routes
  app.route('/api/nodes/:nodeId').all(nodesPolicy.isAllowed)
    .get(nodes.read)
    .put(nodes.update)
    .delete(nodes.delete);

  app.route('/api/nodes/ip/:nodeIp').all(nodesPolicy.isAllowed)
      .get(nodes.nodeip);

  // Finish by binding the node middleware
  app.param('nodeId', nodes.nodeByID);
  app.param('nodeIp', nodes.nodeByIP);
};
