'use strict';

angular.module('core').service('Hotspot', ['$rootScope', 'HotspotsService', 'Authentication', 'UserHotspotsService', '$http', 'InetLogsService',
  function ($rootScope, HotspotsService, Authentication, UserHotspotsService, $http, InetLogsService) {
    // Hotspot service logic
    // ...
    var authentication = Authentication;

    // this.offlineInetState = offlineInetState;
    // this.onlineInetState = onlineInetState;
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
      $.getJSON('//api.ipify.org?format=jsonp&callback=?', function(data) {
        $rootScope.clientIp = data.ip;
        console.log($rootScope.clientIp);
      });
      $.getJSON('api/nodes/ip/' + $rootScope.clientIp, function(data) {
        if (data.length > 0) {
          $rootScope.nodes = data[0];
          UserHotspotsService.query({
            userId: Authentication.user._id
          }, function (data) {
            if (data.length > 0 && data[0].online && $rootScope.nodes) {
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
          });
        }
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
      console.log($rootScope.nodes);
      session.node = $rootScope.nodes ? $rootScope.nodes._id : null;
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
          session.node = $rootScope.nodes ? $rootScope.nodes._id : null;
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

    function inetStartLog() {
      var inetlog = new InetLogsService();
      inetlog.node = $rootScope.nodes._id;
      inetlog.action = 'start';
      inetlog.$save(startLogSuccessCallback, startLogErrorCallback);
    }

    function inetStopLog() {
      var inetlog = new InetLogsService();
      inetlog.node = $rootScope.nodes._id;
      inetlog.action = 'stop';
      inetlog.$save(stopLogSuccessCallback, stopLogErrorCallback);
    }

    function startSuccessCallback(res) {
      // console.log(res);
      onlineInetState();
      // console.log($rootScope.clientIp);
      // console.log($rootScope.nodes);
      inetStartLog();
    }

    function startErrorCallback(res) {
      // vm.error = res.data.message;
      console.log(res);
    }

    function stopSuccessCallback(res) {
      // console.log(res);
      offlineInetState();
      inetStopLog();
    }

    function stopErrorCallback(res) {
      // vm.error = res.data.message;
      console.log(res);
    }

    function startLogSuccessCallback(res) {
      console.log(res);
    }

    function startLogErrorCallback(res) {
      console.log(res);
    }

    function stopLogSuccessCallback(res) {
      console.log(res);
    }

    function stopLogErrorCallback(res) {
      console.log(res);
    }
  }
]);
