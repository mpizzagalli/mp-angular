angular.module('app').controller('LogInController', [
  '$state', 'usersService',
  function ($state, usersService) {
    this.logIn = (user) => {
      usersService.logIn(user).then(
        () => {
          $state.go('main.home');
        }).catch(
        () => {
          this.invalidLogin = true;
        }
      );
    };
  }
]);
