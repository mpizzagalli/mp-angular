angular.module('app').directive('matchTo', [
  function () {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=matchTo'
      },
      link: (scope, element, attributes, ngModel) => {
        ngModel.$validators.matchTo = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch('otherModelValue', () => {
          ngModel.$validate();
        });
      }
    };
  }
]);
