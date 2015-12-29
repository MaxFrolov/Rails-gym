angular.module('app').controller('FoodCtrl', function($scope, Restangular, $stateParams) {
  Restangular.one('foods', $stateParams.id).get().then(function(responce) {
    $scope.food = responce;
  })
});
