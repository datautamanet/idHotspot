'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$window',
  function ($scope, Authentication, $state, $window) {
    var vm = this;

    offlineInetState(); // defaultInetState
    function onlineInetState() {
      $scope.inetbtn = {
        mif: 'mif-switch',
        class: 'warning',
        caption: 'Stop! Koneksi Internet',
        text: 'Klik untuk akhiri akses internet'
      };
    }
    function offlineInetState() {
      $scope.inetbtn = {
        mif: 'mif-power',
        class: 'success',
        caption: 'Mulai! Koneksi Internet',
        text: 'Klik untuk mulai akses internet'
      };
    }

    $scope.authentication = Authentication;
    $scope.startInet = function() {
      onlineInetState();
      // FB.ui({
      //   method: 'share',
      //   href: 'https://developers.facebook.com/docs/'
      // }, function (response) {
      //   console.log(response);
      //   if (response && !response.error_message) {
      //     $scope.$apply(function () {
      //       $scope.sharebtn = {
      //         class: 'warning',
      //         caption: 'Disconnect',
      //         text: 'Klik tombol ini untuk akhiri akses internet'
      //       };
      //     });
      //   } else {
      //     alert('Error while posting.');
      //   }
      // });
    };
    $scope.stopInet = function() {
      offlineInetState();
    };
  }
]);
