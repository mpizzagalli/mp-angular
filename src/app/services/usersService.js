angular.module('app').factory('usersService', [
  'Restangular', 'localStorageService', '$rootScope',
  function (Restangular, localStorageService, $rootScope) {
    return {
      signUp: (user) => {
        return Restangular.all('users').post(user);
      },
      setSessionTokenHeader: () => {
        Restangular.defaultHeaders['X-Parse-Session-Token'] = localStorageService.get('currentUser').token;
      },
      logIn: (user) => {
        return Restangular.all('login').customGET('', user).then(
          (response) => {
            $rootScope.user = {
              firstName: response.firstName,
              lastName: response.lastName
            };
            localStorageService.set('currentUser', {
              token: response.sessionToken,
              objectId: response.objectId
            });
            Restangular.defaultHeaders['X-Parse-Session-Token'] = response.sessionToken;
          }
        );
      },
      logOut: () => {
        return Restangular.all('logout').post().then(
          () => {
            localStorageService.remove('currentUser');
            delete $rootScope.user;
            delete Restangular.defaultHeaders['X-Parse-Session-Token'];
          }
        );
      },
      isAuthenticated: () => {
        return localStorageService.get('currentUser') !== null;
      },
      currentUser: () => {
        if (localStorageService.get('currentUser') !== null) {
          return Restangular.all('users').customGET('me');
        }
      },
      updateUser: (user) => {
        return Restangular.all('users').customPUT(user, localStorageService.get('currentUser').objectId).then(
          (response) => {
            $rootScope.user = {
              firstName: response.firstName,
              lastName: response.lastName
            };
          }
        );
      }
    };
  }
]);
