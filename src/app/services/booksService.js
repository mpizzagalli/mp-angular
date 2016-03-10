angular.module('app').factory('booksService', [
  'Restangular',
  function (Restangular) {
    return {
      getBooks: (limit, offset) => {
        return Restangular.all('classes').customGET('Book', { limit: limit, skip: offset, count: 1});
      }
    };
  }
]);
