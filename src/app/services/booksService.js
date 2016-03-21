angular.module('app').factory('booksService', [
  'Restangular', 'localStorageService',
  function (Restangular, localStorageService) {
    return {
      getBooks: (limit, offset) => {
        return Restangular.all('classes').customGET('Book', { limit: limit, skip: offset, count: 1});
      },
      getBook: (objectId) => {
        return Restangular.all('classes').one('Book', objectId).get();
      },
      rentBook: (objectId, startDate, endDate) => {
        const body = {
          'user': {
            '__type': 'Pointer',
            'className': '_User',
            'objectId': localStorageService.get('currentUser').objectId
          },
          'book': {
            '__type': 'Pointer',
            'className': 'Book',
            'objectId': objectId
          },
          'from': {
            '__type': 'Date',
            'iso': startDate
          },
          'to': {
            '__type': 'Date',
            'iso': endDate
          }
        };

        return Restangular.all('classes').all('Rent').post(body);
      }
    };
  }
]);
