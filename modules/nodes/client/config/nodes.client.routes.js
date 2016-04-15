(function () {
  'use strict';

  angular
    .module('nodes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('nodes', {
        abstract: true,
        url: '/nodes',
        template: '<ui-view/>'
      })
      .state('nodes.list', {
        url: '',
        templateUrl: 'modules/nodes/client/views/list-nodes.client.view.html',
        controller: 'NodesListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: 'Nodes List'
        }
      })
      .state('nodes.create', {
        url: '/create',
        templateUrl: 'modules/nodes/client/views/form-node.client.view.html',
        controller: 'NodesController',
        controllerAs: 'vm',
        resolve: {
          nodeResolve: newNode
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Nodes Create'
        }
      })
      .state('nodes.edit', {
        url: '/:nodeId/edit',
        templateUrl: 'modules/nodes/client/views/form-node.client.view.html',
        controller: 'NodesController',
        controllerAs: 'vm',
        resolve: {
          nodeResolve: getNode
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Node {{ nodeResolve.title }}'
        }
      })
      .state('nodes.view', {
        url: '/:nodeId',
        templateUrl: 'modules/nodes/client/views/view-node.client.view.html',
        controller: 'NodesController',
        controllerAs: 'vm',
        resolve: {
          nodeResolve: getNode
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Node {{ nodeResolve.title }}'
        }
      });
  }

  getNode.$inject = ['$stateParams', 'NodesService'];

  function getNode($stateParams, NodesService) {
    return NodesService.get({
      nodeId: $stateParams.nodeId
    }).$promise;
  }

  newNode.$inject = ['NodesService'];

  function newNode(NodesService) {
    return new NodesService();
  }
}());
