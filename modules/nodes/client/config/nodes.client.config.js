(function () {
  'use strict';

  angular
    .module('nodes')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {

    Menus.addMenuItem('topbar', {
      title: 'Nodes',
      state: 'nodes',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'nodes', {
      title: 'List Nodes',
      state: 'nodes.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'nodes', {
      title: 'Create Node',
      state: 'nodes.create',
      roles: ['admin']
    });

    // // Add the Sidebar
    // Menus.addMenuItem('sidebar', {
    //   title: 'Nodes',
    //   state: 'nodes.list',
    //   type: 'link',
    //   roles: ['admin'],
    //   icon: 'mif-location'
    // });

  }
}());
