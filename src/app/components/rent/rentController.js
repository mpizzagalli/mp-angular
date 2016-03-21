angular.module('app').controller('RentController', [
  '$state', '$stateParams', '$scope', '$translate', 'booksService',
  function ($state, $stateParams, $scope, $translate, booksService) {
    this.startDate = new Date();

    const calculateEndDate = () => {
      const result = new Date(this.startDate);
      result.setDate(result.getDate() + 15);
      return result;
    };

    this.updateEndDate = () => {
      this.endDate = calculateEndDate();
    };

    this.updateEndDate();

    booksService.getBook($stateParams.id).then(
      (response) => {
        this.book = response;
      }
    );

    this.rent = () => {
      booksService.rentBook($stateParams.id, this.startDate, this.endDate).then(
        () => {
          $state.go(
            'main.books', {
              id: $stateParams.id,
              message: $translate.instant('RENT.SUCCESS')
            }
          );
        },
        () => {
          $state.go(
            'main.books', {
              id: $stateParams.id,
              message: $translate.instant('RENT.FAILURE')
            }
          );
        }
      );
    };
  }
]);
