angular.module('app').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise( ($injector) => {
      $injector.get('$state').go('main.home');
    });

    // Now set up the states
    $stateProvider
      .state('main', {
        abstract: true,
        views: {
          main: {
            controller: 'MainController as mainCtrl',
            templateUrl: '../app/components/main/main.html'
          }
        }
      })
      .state('main.home', {
        url: '/home',
        views: {
          content: {
            templateUrl: '../app/components/home/index.html'
          }
        },
        authenticate: true
      })
      .state('main.sign_up', {
        url: '/sign_up',
        views: {
          content: {
            controller: 'SignUpController as signUpCtrl',
            templateUrl: '../app/components/sign_up/index.html'
          }
        },
        authenticate: false
      })
      .state('main.log_in', {
        url: '/log_in',
        views: {
          content: {
            controller: 'LogInController as logInCtrl',
            templateUrl: '../app/components/log_in/log_in.html'
          }
        },
        authenticate: false
      })
      .state('main.profile', {
        url: '/me',
        params: { message: null },
        views: {
          content: {
            controller: 'ProfileController as profileCtrl',
            templateUrl: '../app/components/profile/profile.html'
          }
        },
        authenticate: true
      })
      .state('main.password', {
        url: '/password',
        views: {
          content: {
            controller: 'PasswordController as passwordCtrl',
            templateUrl: '../app/components/password/password.html'
          }
        },
        authenticate: true
      });

    $locationProvider.html5Mode(true);
  }
]);
