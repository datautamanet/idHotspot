(function () {
  'use strict';

  angular
    .module('inetlogs.services')
    .factory('InetLogsService', InetLogsService);

  InetLogsService.$inject = ['$resource'];

  function InetLogsService($resource) {
    return $resource('api/inetlogs/:inetlogId', {
      inetlogId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
