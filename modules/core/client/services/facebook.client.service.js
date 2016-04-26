'use strict';

angular.module('core').service('Facebook', ['Hotspot', '$rootScope',
  function (Hotspot, $rootScope) {

    this.inetStartShare = function (url) {
      if ($rootScope.nodes) {
        FB.ui({
          method: 'share',
          href: url
        }, function (response) {
          if (response && !response.error_message) {
            // console.log($rootScope.nodes);
            console.log('Content has been shared.');
            Hotspot.start();
          } else {
            console.log('Error while posting.');
          }
        });
      } else {
        $.Notify({
          caption: 'Internet Start Error',
          content: 'Anda tidak berada di dalam jangkauan area idHotspot',
          icon: '<b class="mif mif-location"></b>',
          type: 'alert'
        });
      }
    };

  }
]);
