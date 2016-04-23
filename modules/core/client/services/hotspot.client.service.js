'use strict';

angular.module('core').service('Hotspot', ['$rootScope', 'HotspotsService', 'Authentication', 'UserHotspotsService', '$http', 'IpNodesService',
  function ($rootScope, HotspotsService, Authentication, UserHotspotsService, $http, IpNodesService) {
    // Hotspot service logic
    // ...
    var authentication = Authentication;

    this.offlineInetState = offlineInetState;
    this.onlineInetState = onlineInetState;
    this.startSession = startSession;
    this.stopSession = stopSession;
    this.checkSession = checkSession;

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

    function checkSession() {
      UserHotspotsService.query({
        userId: Authentication.user._id
      }, function (data) {
        if (data.length > 0 && data[0].online) {
          var waktu = new Date().toISOString();
          var selisih = new Date(waktu) - new Date(data[0].created);
          var session_time = Math.floor(selisih / 60e3);
          if (data[0].session_time > session_time) {
            onlineInetState();
            if (session_time < 1) session_time = 1;
            var session_counter = setInterval(function () {
              console.log(session_time++);
              if (session_time > data[0].session_time) {
                stopSession();
                clearSession();
                clearInterval(session_counter);
              }
            }, 60000);
          } else {
            offlineInetState();
          }
        } else {
          offlineInetState();
        }
        // $http.get('//api.ipify.org?format=jsonp&callback=?').then(function (data) {
        //   // console.log(JSON.stringify(data, null, 2));
        //   console.log(data.data);
        // }, function (data) {
        //   console.log(data);
        // });
        $.getJSON('//api.ipify.org?format=jsonp&callback=?', function(data) {
          $rootScope.clientIp = data.ip;
        });
        $http.get('api/nodes/ip/' + $rootScope.clientIp).then(function successCallback(response) {
          $scope.$apply(function () {
            $rootScope.nodes = response.data[0];
          });
        }, function errorCallback(response) {
          console.log(response);
        });
      });
    }

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
            checkSession();
          }
        } else {
          startSession();
          checkSession();
        }
      });
    };

    function startSession() {
      var session = new HotspotsService();
      session.user = authentication.user;
      session.session_time = 1440; // 60*24hrs
      session.online = true;
      session.node = '5710fd5399b6d6c82e306556';
      session.$save(startSuccessCallback, startErrorCallback);
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
          $http.delete(url).then(stopSuccessCallback, stopErrorCallback);
        }
      });
    }

    function startSuccessCallback(res) {
      // console.log(res);
      onlineInetState();
      // alert($rootScope.clientIp);
      console.log($rootScope.nodes);
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
