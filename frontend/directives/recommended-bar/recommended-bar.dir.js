angular.module('app').directive('recommendedBar', function() {
  return {
    restrict: 'E',
    templateUrl:'directives/recommended-bar/recommended-bar.html',
    scope: {
      resources: '=',
      link: '@'
    }
  }
});
