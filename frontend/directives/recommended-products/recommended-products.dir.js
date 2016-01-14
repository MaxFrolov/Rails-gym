angular.module('app').directive('recommendedProducts', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/recommended-products/recommended-products.html',
    scope: {
      resources: '=',
      link: '@'
    },
    controller: function($scope) {
      console.log($scope.link)
    }
  }
});
