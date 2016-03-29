angular.module('app').factory('usersService', [
  'Restangular', 'localStorageService', '$rootScope',
  function (Restangular, localStorageService, $rootScope) {
    const setTokenAsDefaultHeader = () => {
      Restangular.defaultHeaders['X-Parse-Session-Token'] = localStorageService.get('currentUser').token;
    };

    const signIn = (user) => {
      const success = (response) => {
        $rootScope.user = {
          firstName: response.firstName,
          lastName: response.lastName,
          username: user.username
        };
        localStorageService.set('currentUser', {
          token: response.sessionToken,
          objectId: response.objectId
        });
        setTokenAsDefaultHeader();
      };

      return Restangular.all('login').customGET('', user).then(success);
    };

    const updateUserData = (data) => {
      return Restangular.all('users').customPUT(data, localStorageService.get('currentUser').objectId);
    };

    return {
      signUp: (user) => {
        return Restangular.all('users').post(user);
      },
      setSessionTokenHeader: setTokenAsDefaultHeader,
      logIn: signIn,
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
        const success = (response) => {
          $rootScope.user = {
            firstName: response.firstName,
            lastName: response.lastName,
            username: user.username
          };
        };

        return updateUserData(user).then(success);
      },
      changePassword: (newPassword) => {
        const success = () => {
          delete Restangular.defaultHeaders['X-Parse-Session-Token'];
          newPassword.username = $rootScope.user.username;
          return signIn(newPassword);
        };

        return updateUserData(newPassword).then(success);
      }
    };
  }
]);
