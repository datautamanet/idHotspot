(function () {
  'use strict';

  angular
    .module('hotspots.services')
    .factory('UserHotspotsService', UserHotspotsService);

  UserHotspotsService.$inject = ['$resource'];

  function UserHotspotsService($resource) {
    return $resource('api/hotspots/user/:userId', {
      userId: '@_id'
    });
  }
}());
