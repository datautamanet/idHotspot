'use strict';

function ArticleNotification(data) {
  $.Notify({
    caption: data.caption,
    content: 'Dengan judul ' + data.content.title + ' telah di' + data.action + ' oleh ' + data.user.displayName,
    icon: '<b class="' + data.icon + '"></b>',
    type: data.type,
    keepOpen: data.keepOpen
  });
}


angular.module('core').controller('SidebarController', ['$scope', '$state', 'Authentication', 'Menus', 'ArticlesService', 'Socket',
  function ($scope, $state, Authentication, Menus, ArticlesService, Socket) {
    $scope.articles = ArticlesService.query();

    init();
    function init() {
      if (!Authentication.user) {
        $state.go('home');
      }

      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.on('articleNotification', function (notification) {
        if (notification.action === 'buat') {
          $scope.articles.unshift(notification.content);
        }

        if (notification.action === 'hapus') {
          $scope.articles.length = $scope.articles.length - 1;
        }

        ArticleNotification(notification);
      });
    }

    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the sidebar menu
    $scope.menu = Menus.getMenu('sidebar');

    // Get the account menu
    $scope.accountMenu = Menus.getMenu('account').items[0];

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

  }
]);
