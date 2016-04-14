(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$state', 'articleResolve', '$window', 'Socket', 'Authentication'];

  function ArticlesController($scope, $state, article, $window, Socket, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    init();

    function init() {
      if (!Authentication.user) {
        $state.go('home');
      }

      if (!Socket.socket) {
        Socket.connect();
      }
    }

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(successCallback, errorCallback);
        Socket.emit('articleNotification', {
          caption: 'Hapus Artikel',
          action: 'hapus',
          type: 'alert',
          content: vm.article,
          keepOpen: false
        });
      }
      function successCallback() {
        $state.go('articles.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        Socket.emit('articleNotification', {
          caption: 'Sunting Artikel',
          action: 'sunting',
          type: 'warning',
          content: vm.article,
          keepOpen: false
        });
        vm.article.$update(successCallback, errorCallback);
      } else {
        Socket.emit('articleNotification', {
          caption: 'Artikel Baru',
          action: 'buat',
          type: 'success',
          content: vm.article,
          keepOpen: false
        });
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
