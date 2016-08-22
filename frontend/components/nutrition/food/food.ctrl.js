angular.module('app').controller('FoodCtrl', function($scope, Restangular, $stateParams, $sce) {
  Restangular.one('foods', $stateParams.id).get().then(function(responce) {
    $scope.food = responce;
    $scope.userLiked = _.some(responce.likes, {user_id: $scope.currentUser.id});
  });
  $scope.recommendedNutrition = Restangular.all('foods').all('recommended_foods').getList({count: 3}).$object
  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };
  console.log($scope.recommendedNutrition)
});

