angular.module('app').controller('DashboardController', [
  '$state', 'booksService',
  function ($state, booksService) {
    const success = (response) => {
      this.books = response.results;
      this.booksAmount = response.count;
    };

    const getBooks = () => {
      booksService.getBooks(this.limit, this.page * this.limit).then(success);
    };

    this.limit = 2;
    this.page = 0;

    this.nextPage = () => {
      this.page++;
      getBooks();
    };

    this.previousPage = () => {
      this.page--;
      getBooks();
    };

    getBooks();
  }
]);
