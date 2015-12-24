angular.module('app').controller('FoodCtrl', function($scope, Restangular, $stateParams) {

  Restangular.one('diet_advices', $stateParams.id).get().then(function(responce) {
    $scope.food = responce;
  })
});
