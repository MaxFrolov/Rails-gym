'use strict';

angular.module('app').directive('collectionSort', function () {
  return {
    restrict: 'E',
    controller: function ($scope, $state) {
      $scope.changeSort = changeSort;

      function changeSort() {
        $state.go('.', {sort: $scope.resource.reqParams.sort}, {notify: false});
        $scope.resource.getList($scope.resource.reqParams).then(function (result) {
          $scope.resource = result;
        });
      }
    },
    templateUrl: 'directives/collection-sort/collection-sort.html',
    scope: {
      resource: '=',
      options: '='
    }
  }
});
