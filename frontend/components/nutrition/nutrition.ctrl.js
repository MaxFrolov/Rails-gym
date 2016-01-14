angular.module('app').controller('NutritionCtrl', function($scope, Restangular, $stateParams) {
  $scope.nutritions = Restangular.all('foods').getList({page: $stateParams.page, per: 6}).$object;
  $scope.recommendedNutrition = Restangular.all('foods').all('recommended_foods').getList({count: 3}).$object
});
