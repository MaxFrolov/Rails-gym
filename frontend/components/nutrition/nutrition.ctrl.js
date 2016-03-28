angular.module('app').controller('NutritionCtrl', function($scope, Restangular, $stateParams) {
  $scope.recommendedNutrition = Restangular.all('foods').all('recommended_foods').getList({count: 3}).$object
});
