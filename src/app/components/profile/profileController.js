angular.module('app').controller('ProfileController', [
  '$state', 'usersService',
  function ($state, usersService) {
    usersService.currentUser().then(
      (response) => {
        this.user = response;
      }
    );
  }
]);
