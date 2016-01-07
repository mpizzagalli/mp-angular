angular.module('app').factory('usersService', [
  'Restangular', 'localStorageService',
  function (Restangular, localStorageService) {
    return {
      signUp: (user) => {
        return Restangular.all('users').post(user);
      },
      logIn: (user) => {
        return Restangular.all('login').customGET('', user).then(
          (response) => {
            localStorageService.set('token', response.sessionToken);
          }
        );
      },
      logOut: () => {
        return Restangular.all('logout').post(null, {}, { 'X-Parse-Session-Token': localStorageService.get('token')}).then(
          () => {
            localStorageService.remove('token');
          }
        );
      },
      isAuthenticated: () => {
        return localStorageService.get('token') !== null;
      }
    };
  }]);
