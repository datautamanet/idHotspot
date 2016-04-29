'use strict';

angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$state', '$window', 'Facebook', 'Hotspot', 'Socket',
  function ($scope, $rootScope, Authentication, $state, $window, Facebook, Hotspot, Socket) {
    $scope.authentication = Authentication;

    if ($scope.authentication) {
      Hotspot.checkSession();

      $scope.startInet = function() {
        var url = $rootScope.nodes ? $rootScope.nodes.sharer : 'http://idbillboard.datautama.net.id/idhotspot-by-datautama/';
        Facebook.inetStartShare(url);
      };
      $scope.stopInet = function() {
        Hotspot.stopSession();
      };
    }
  }
]);
