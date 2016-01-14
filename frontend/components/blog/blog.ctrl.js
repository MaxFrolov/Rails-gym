angular.module('app').controller('BlogCtrl', function($scope, Restangular) {
  $scope.recommendedPosts = Restangular.all('posts').all('recommended_posts').getList({count: 3}).$object;
  $scope.recommendedProducts = Restangular.all('products').all('recommended_products').getList({count: 3}).$object;
});
