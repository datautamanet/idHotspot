(function (app) {
  'use strict';

  app.registerModule('hotspots', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('hotspots.services');
}(ApplicationConfiguration));
