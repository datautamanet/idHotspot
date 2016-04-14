(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'userResolve', 'PasswordValidator'];

  function UserController($scope, $state, $window, Authentication, user, PasswordValidator) {
    var vm = this;

    vm.authentication = Authentication;
    vm.user = user;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.remove = remove;
    vm.update = update;
    vm.save = save;

    function remove(user) {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          vm.users.splice(vm.users.indexOf(user), 1);
        } else {
          vm.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.user._id) {
        vm.user.$update(successCallback, errorCallback);
      } else {
        vm.user.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.user', {
          userId: user._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        vm.error = errorResponse.data.message;
      });
    }

    $scope.roles = {
      user: 'User',
      admin: 'Administrator'
    };
  }
}());
