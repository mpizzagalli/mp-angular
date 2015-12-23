angular.module('app').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // For any unmatched urls
    $urlRouterProvider.otherwise( ($injector) => {
      $injector.get('$state').go('home');
    });

    // Now set up the states
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          main: {
            templateUrl: '../app/components/home/index.html'
          }
        }
      })
      .state('sign_up', {
        url: '/sign_up',
        views: {
          main: {
            controller: 'SignUpController as signUpCtrl',
            templateUrl: '../app/components/sign_up/index.html'
          }
        }
      });

    $locationProvider.html5Mode(true);
  }
]);
