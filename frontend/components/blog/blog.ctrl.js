angular.module('app').controller('BlogCtrl', function($scope, Restangular) {
  $scope.recommendedPosts = Restangular.all('posts').all('recommended_posts').getList({count: 5}).$object;
});
