(function () {
  'use strict';

  angular
    .module('nodes.services')
    .factory('IpNodesService', IpNodesService);

  IpNodesService.$inject = ['$resource'];

  function IpNodesService($resource) {
    return $resource('api/nodes/ip/:nodeIp', {
      nodeIp: '@ip_address'
    }, {
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }
}());
