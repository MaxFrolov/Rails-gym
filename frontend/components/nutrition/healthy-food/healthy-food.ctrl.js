angular.module('app').controller('HealthyFoodCtrl', function($scope, Restangular, $stateParams) {
  $scope.nutritions = Restangular.all('foods').getList({page: $stateParams.page, per: 6}).$object
});
