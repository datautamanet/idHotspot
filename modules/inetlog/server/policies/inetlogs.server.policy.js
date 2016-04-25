'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke InetLogs Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/inetlogs',
      permissions: '*'
    }, {
      resources: '/api/inetlogs/:inetlogId',
      permissions: '*'
    }]
  }, {
    roles: ['owner'],
    allows: [{
      resources: '/api/inetlogs',
      permissions: ['get', 'post']
    }, {
      resources: '/api/inetlogs/:inetlogId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If InetLogs Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an inetlog is being processed and the current user created it then allow any manipulation
  if (req.inetlog && req.user && req.inetlog.user && req.inetlog.user.id === req.user.id) {
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
