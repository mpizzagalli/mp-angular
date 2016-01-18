angular.module('app').controller('ProfileController', [
  '$state', 'usersService',
  function ($state, usersService) {
    usersService.currentUser().then(
      (response) => {
        this.user = response;
        this.originalUser = angular.copy(response);
      }
    );

    this.activateEdit = () => {
      this.editOn = true;
    };

    this.deactivateEdit = () => {
      this.editOn = false;
      this.user = angular.copy(this.originalUser);
    };

    this.updateUser = (user) => {
      usersService.updateUser(user).then(
        () => {
          this.editOn = false;
          $state.reload();
        }
      );
    };
  }
]);
