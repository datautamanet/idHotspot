(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService', 'Socket'];

  function ArticlesListController(ArticlesService, Socket) {
    var vm = this;

    vm.articles = ArticlesService.query();

    init();

    function init() {
      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.on('articleNotification', function (notification) {
        vm.articles.unshift(notification.content);
      });
    }
  }
}());
