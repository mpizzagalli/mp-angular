angular.module('app').controller('SignUpController', [
  '$state', 'usersService',
  function ($state, usersService) {
    this.addUser = function (user) {
      if (user.password === user.confirmPassword) {
        usersService.signUp(user).then(
          () => {
            $state.go('home');
          },
          () => {
            console.log('The request failed');
          }
        );
      }
    };
  }
]);
