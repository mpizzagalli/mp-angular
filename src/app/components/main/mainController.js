angular.module('app').controller('MainController', [
  '$state', 'usersService',
  function ($state, usersService) {
    this.logged = usersService.isAuthenticated;
    this.logOut = () => {
      return usersService.logOut().then(
        () => {
          $state.go('main.log_in');
        }
      );
    };
  }
]);
