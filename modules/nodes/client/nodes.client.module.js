(function (app) {
  'use strict';
  app.registerModule('nodes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('nodes.services');
  app.registerModule('nodes.routes', ['ui.router', 'nodes.services']);
}(ApplicationConfiguration));
