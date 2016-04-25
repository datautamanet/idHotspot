'use strict';

angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$state', '$window', 'Facebook', 'Hotspot', 'Socket',
  function ($scope, $rootScope, Authentication, $state, $window, Facebook, Hotspot, Socket) {
    $scope.authentication = Authentication;

    Hotspot.checkSession();

    $scope.startInet = function() {
      var url = $rootScope.nodes.sharer;
      Facebook.inetStartShare(url);
    };
    $scope.stopInet = function() {
      Hotspot.stopSession();
    };
  }
]);
