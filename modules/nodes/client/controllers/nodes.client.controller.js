(function () {
  'use strict';

  angular
    .module('nodes')
    .controller('NodesController', NodesController);

  NodesController.$inject = ['$scope', '$state', 'nodeResolve', '$window', 'Socket', 'Authentication'];

  function NodesController($scope, $state, node, $window, Socket, Authentication) {
    var vm = this;

    vm.node = node;
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

    // Remove existing Node
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.node.$remove(successCallback, errorCallback);
      }
      function successCallback() {
        $state.go('nodes.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Save Node
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.nodeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.node._id) {
        vm.node.$update(successCallback, errorCallback);
      } else {
        vm.node.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('nodes.view', {
          nodeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
