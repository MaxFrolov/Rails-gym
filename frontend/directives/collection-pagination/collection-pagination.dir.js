'use strict';

angular.module('app').directive('collectionPagination', function() {
  return {
    restrict: 'E',
    controller: function($scope, $state) {
      $scope.changePage = changePage;

      function changePage() {
        $state.go('.', {page: $scope.resource.reqParams.page}, {notify: false});
        $scope.resource.getList($scope.resource.reqParams).then(function(result) {
          $scope.shuffle ? _.assign(result, _.shuffle(result)) : result;
          $scope.resource = result;
        });
      }
    },
    templateUrl: 'directives/collection-pagination/collection-pagination.html',
    scope: {
      resource: '=',
      shuffle: '='
    }
  };
});
