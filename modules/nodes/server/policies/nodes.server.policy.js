'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Nodes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/nodes',
      permissions: '*'
    }, {
      resources: '/api/nodes/:nodeId',
      permissions: '*'
    }, {
      resources: '/api/nodes/ip/:nodeIp',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/nodes',
      permissions: ['get']
    }, {
      resources: '/api/nodes/:nodeId',
      permissions: ['get']
    }, {
      resources: '/api/nodes/ip/:nodeIp',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/nodes',
      permissions: ['get']
    }, {
      resources: '/api/nodes/:nodeId',
      permissions: ['get']
    }, {
      resources: '/api/nodes/ip/:nodeIp',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Nodes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an nodes is being processed and the current user created it then allow any manipulation
  if (req.node && req.user && req.node.user && req.node.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
