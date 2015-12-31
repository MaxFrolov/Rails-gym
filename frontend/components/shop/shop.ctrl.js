angular.module('app').controller('ShopCtrl', function($scope, Restangular, $stateParams) {
  $scope.products = Restangular.all('products').getList({ page: $stateParams.page, per: 6 }).$object;
});
