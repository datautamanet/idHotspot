'use strict';

angular.module('core').service('Facebook', ['Hotspot', '$rootScope',
  function (Hotspot, $rootScope) {

    this.inetStartShare = function (url) {
      FB.ui({
        method: 'share',
        href: url
      }, function (response) {
        if (response && !response.error_message) {
          console.log($rootScope.nodes);
          console.log('Content has been shared.');
          Hotspot.start();
        } else {
          console.log('Error while posting.');
        }
      });
    };

  }
]);
