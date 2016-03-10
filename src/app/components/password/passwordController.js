angular.module('app').controller('PasswordController', [
  '$state', 'usersService', '$translate',
  function ($state, usersService, $translate) {
    this.updatePassword = () => {
      const body = {
        password: this.password
      };
      const success = () => {
        $state.go(
          'main.profile', {
            message: $translate.instant('USER.PASSWORD_UPDATE_SUCCES')
          }
        );
      };
      const failure = () => {
        $state.go(
          'main.profile', {
            message: $translate.instant('USER.PASSWORD_UPDATE_FAILURE')
          }
        );
      };
      usersService.changePassword(body).then(success, failure);
    };
  }
]);
