angular.module('app').factory('usersService', [
  'Restangular',
  function (Restangular) {
    return {
      signUp: (user) => {
        return Restangular.all('users').post(user);
      }
    };
  }]);
