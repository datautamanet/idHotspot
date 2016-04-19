'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Hotspot Sessions Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/hotspots',
      permissions: '*'
    }, {
      resources: '/api/hotspots/:hotspotId',
      permissions: '*'
    }, {
      resources: '/api/hotspots/user/:userId',
      permissions: ['get']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/hotspots',
      permissions: ['get', 'post']
    }, {
      resources: '/api/hotspots/:hotspotId',
      permissions: ['get', 'put']
    }, {
      resources: '/api/hotspots/user/:userId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Hotspot Sessions Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a hotspot session is being processed and the current user created it then allow any manipulation
  if (req.hotspot && req.user && req.hotspot.user && req.hotspot.user.id === req.user.id) {
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
