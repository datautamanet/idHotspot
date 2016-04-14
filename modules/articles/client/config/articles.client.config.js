(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus', 'ArticlesService'];

  function menuConfig(Menus, ArticlesService) {

    // Menus.addMenuItem('topbar', {
    //   title: 'Articles',
    //   state: 'articles',
    //   type: 'dropdown',
    //   roles: ['admin']
    // });
    //
    // // Add the dropdown list item
    // Menus.addSubMenuItem('topbar', 'articles', {
    //   title: 'List Articles',
    //   state: 'articles.list',
    //   roles: ['admin']
    // });
    //
    // // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'articles', {
    //   title: 'Create Article',
    //   state: 'articles.create',
    //   roles: ['admin']
    // });
    //
    // // Add the Sidebar
    // Menus.addMenuItem('sidebar', {
    //   title: 'Articles',
    //   state: 'articles.list',
    //   type: 'link',
    //   roles: ['admin'],
    //   icon: 'mif-stack'
    // });

  }
}());
