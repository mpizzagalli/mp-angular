angular.module('app').config([
  'RestangularProvider', 'configuration', 'localStorageServiceProvider',
  function (RestangularProvider, configuration, localStorageServiceProvider) {

    // Restangular Setup
    RestangularProvider.setBaseUrl(configuration.apiUrl);
    RestangularProvider.setDefaultHeaders({ 'Content-Type': 'application/json',
                                            'X-Parse-Application-Id': configuration.applicationId,
                                            'X-Parse-REST-API-Key': configuration.apiKey });

    // Local Storage Setup
    localStorageServiceProvider.setPrefix(window.btoa('app-/* @echo environment */'));
  }
]);
