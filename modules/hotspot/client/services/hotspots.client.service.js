(function () {
  'use strict';

  angular
    .module('hotspots.services')
    .factory('HotspotsService', HotspotsService);

  HotspotsService.$inject = ['$resource'];

  function HotspotsService($resource) {
    return $resource('api/hotspots/:hotspotId', {
      hotspotId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
