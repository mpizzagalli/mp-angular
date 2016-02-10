angular.module('app').controller('PasswordController', [
  '$state', 'usersService',
  function ($state, usersService) {
    this.updatePassword = () => {
      const body = {
        password: this.password
      };
      usersService.changePassword(body).then(
        () => {
          $state.go('main.profile');
        }
      );
    };
  }
]);
