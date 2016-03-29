angular.module('app').controller('BooksController', [
  '$state', '$stateParams', 'booksService',
  function ($state, $stateParams, booksService) {

    const success = (response) => {
      this.book = response;
    };

    booksService.getBook($stateParams.id).then(success);
  }
]);
