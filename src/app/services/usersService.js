angular.module('app').factory('usersService', [
  'Restangular', 'localStorageService', '$rootScope',
  function (Restangular, localStorageService, $rootScope) {
    return {
      signUp: (user) => {
        return Restangular.all('users').post(user);
      },
      setSessionTokenHeader: () => {
        Restangular.defaultHeaders['X-Parse-Session-Token'] = localStorageService.get('currentUserToken');
      },
      logIn: (user) => {
        return Restangular.all('login').customGET('', user).then(
          (response) => {
            $rootScope.user = {
              firstName: response.firstName,
              lastName: response.lastName
            };
            localStorageService.set('currentUserToken', response.sessionToken);
            Restangular.defaultHeaders['X-Parse-Session-Token'] = localStorageService.get('currentUserToken');
          }
        );
      },
      logOut: () => {
        return Restangular.all('logout').post().then(
          () => {
            localStorageService.remove('currentUserToken');
            delete $rootScope.user;
            delete Restangular.defaultHeaders['X-Parse-Session-Token'];
          }
        );
      },
      isAuthenticated: () => {
        return localStorageService.get('currentUserToken') !== null;
      },
      currentUser: () => {
        if (localStorageService.get('currentUserToken') !== null) {
          return Restangular.all('users').customGET('me');
        }
      }
    };
  }
]);
