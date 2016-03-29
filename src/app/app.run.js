angular.module('app').run([
  '$rootScope', '$state', 'usersService',
  function ($rootScope, $state, usersService) {
    $rootScope.$on('$stateChangeStart', (e, toState) => {
      if (toState.authenticate && !usersService.isAuthenticated()) {
        $state.go('main.log_in');
        e.preventDefault();
      }
    });

    if (usersService.isAuthenticated()) {
      usersService.setSessionTokenHeader();

      usersService.currentUser().then(
        (response) => {
          $rootScope.user = {
            firstName: response.firstName,
            lastName: response.lastName,
            username: response.username
          };
        }
      );
    }
  }
]);
