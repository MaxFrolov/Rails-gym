angular.module('app').controller('PostsCtrl',function($scope, Restangular, $stateParams, $state, toParams) {
  $scope.sortValue = sortValue;
  $scope.loading = true;

  var params = {
    page: $stateParams.page,
    per: 3,
    category_id: $stateParams.category_id
  };

  Restangular.all('posts').withHttpConfig({paramSerializer: toParams}).getList(params).then(function(posts){
      $scope.posts = posts;
  }).finally(function() { $scope.loading = false; });

  function sortValue(value) {
    _.extend($scope.posts.reqParams, {category_id: value});
   $state.go('.', {category_id: $scope.posts.reqParams.category_id}, {notify: false});
    $scope.posts.withHttpConfig({paramSerializer: toParams}).getList($scope.posts.reqParams).then(function (result) {
    $scope.posts = result;
   });
  }
});
