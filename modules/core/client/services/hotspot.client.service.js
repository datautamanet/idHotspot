'use strict';

angular.module('core').service('Hotspot', ['$rootScope', 'HotspotsService', 'Authentication', 'UserHotspotsService', '$http',
  function ($rootScope, HotspotsService, Authentication, UserHotspotsService, $http) {
    // Hotspot service logic
    // ...
    var authentication = Authentication;

    this.offlineInetState = offlineInetState;
    this.onlineInetState = onlineInetState;
    this.startSession = startSession;
    this.stopSession = stopSession;

    function onlineInetState() {
      $rootScope.inetbtn = {
        mif: 'mif-switch',
        class: 'warning',
        caption: 'Stop! Koneksi Internet',
        text: 'Klik untuk akhiri akses internet'
      };
    }

    function offlineInetState() {
      $rootScope.inetbtn = {
        mif: 'mif-facebook',
        class: 'success',
        caption: 'Mulai! Koneksi Internet',
        text: 'Klik untuk mulai akses internet'
      };
    }

    this.checkSession = function () {
      UserHotspotsService.query({
        userId: Authentication.user._id
      }, function (data) {
        if (data.length > 0 && data[0].online) {
          var waktu = new Date().toISOString();
          var selisih = new Date(waktu) - new Date(data[0].created);
          var session_time = Math.floor(selisih / 60e3);
          if (data[0].session_time > session_time) {
            onlineInetState();
          } else {
            offlineInetState();
          }
        } else {
          offlineInetState();
        }
      });
    };

    this.start = function () {
      UserHotspotsService.query({
        userId: Authentication.user._id
      }, function (data) {
        if (data.length > 0) {
          var waktu = new Date().toISOString();
          var selisih = new Date(waktu) - new Date(data[0].created);
          var session_time = Math.floor(selisih / 60e3);
          if (data[0].session_time > session_time) {
            restartSession();
          } else {
            clearSession();
            startSession();
          }
        } else {
          startSession();
        }
      });
    };

    function startSession() {
      var session = new HotspotsService();
      session.user = authentication.user;
      session.session_time = 1440;
      session.online = true;
      session.node = '5710fd5399b6d6c82e306556';
      session.$save(startSuccessCallback, startErrorCallback);
      onlineInetState();
    }

    function stopSession() {
      UserHotspotsService.query({
        userId: Authentication.user._id
      }, function (data) {
        if (data.length > 0) {
          var url = 'api/hotspots/' + data[0]._id;
          var session = data[0];
          session.online = false;
          $http.put(url, session).then(stopSuccessCallback, stopErrorCallback);
        }
      });
    }

    function restartSession() {
      UserHotspotsService.query({
        userId: Authentication.user._id
      }, function (data) {
        if (data.length > 0) {
          var url = 'api/hotspots/' + data[0]._id;
          var session = data[0];
          session.online = true;
          $http.put(url, session).then(startSuccessCallback, startErrorCallback);
          onlineInetState();
        }
      });
    }

    function clearSession() {
      UserHotspotsService.query({
        userId: Authentication.user._id
      }, function (data) {
        if (data.length > 0) {
          var url = 'api/hotspots/' + data[0]._id;
          var session = data[0];
          session.online = true;
          $http.delete(url).then(startSuccessCallback, startErrorCallback);
        }
      });
    }

    function startSuccessCallback(res) {
      // console.log(res);
      onlineInetState();
    }

    function startErrorCallback(res) {
      // vm.error = res.data.message;
      console.log(res);
    }

    function stopSuccessCallback(res) {
      // console.log(res);
      offlineInetState();
    }

    function stopErrorCallback(res) {
      // vm.error = res.data.message;
      console.log(res);
    }

  }
]);
