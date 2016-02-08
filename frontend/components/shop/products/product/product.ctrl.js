angular.module('app').controller('ProductCtrl', function($scope, $stateParams, Restangular) {
  $scope.product = Restangular.one('products', $stateParams.id).get().$object;
  $scope.productCount = 1;
  $scope.validateCount = validateCount;
  $scope.removeButton = removeButton;

  function removeButton() {
    $scope.addingSuccess = false;
  }

  function validateCount(count) {
    if (count < 1) {
      $scope.productCount = 1;
    }
  }
});
