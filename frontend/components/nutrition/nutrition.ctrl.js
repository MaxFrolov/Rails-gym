angular.module('app').controller('NutritionCtrl', function($scope, Restangular, $stateParams) {
  $scope.nutritions = Restangular.all('diet_advices').getList({page: $stateParams.page, per: 6}).$object
});
