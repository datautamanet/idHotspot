(function (app) {
  'use strict';

  app.registerModule('inetlogs', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('inetlogs.services');
}(ApplicationConfiguration));
