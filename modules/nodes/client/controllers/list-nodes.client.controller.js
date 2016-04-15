(function () {
  'use strict';

  angular
    .module('nodes')
    .controller('NodesListController', NodesListController);

  NodesListController.$inject = ['NodesService', 'Socket'];

  function NodesListController(NodesService, Socket) {
    var vm = this;

    vm.nodes = NodesService.query();
  }
}());
