'use strict';

angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', '$state', '$window', 'Facebook', 'Hotspot', 'Socket',
  function ($scope, $rootScope, Authentication, $state, $window, Facebook, Hotspot, Socket) {
    $scope.authentication = Authentication;

    Hotspot.checkSession();

    $scope.startInet = function() {
      var url = $rootScope.nodes ? $rootScope.nodes.sharer : 'http://203.89.28.253/idhotspot-by-datautama/';
      Facebook.inetStartShare(url);
    };
    $scope.stopInet = function() {
      Hotspot.stopSession();
    };
  }
]);
