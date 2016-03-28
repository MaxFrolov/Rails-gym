angular.module('app').controller('PostsCtrl',function($scope, Restangular, $stateParams, $state, toParams) {
  $scope.sortValue = sortValue;
  $scope.sortBy = sortBy;
  $scope.loading = true;

  $scope.categoryFields= [
    {
     name: 'Музыка',
     value: 0
    },
    {
     name: 'Спорт',
     value: 1
    },
    {
     name: 'Технологии',
     value: 2
    },
    {
     name: 'Природа',
     value: 3
    }
  ];

  var params = {
    page: $stateParams.page,
    per: 5,
    sort: $stateParams.sort
  };

  Restangular.all('posts').withHttpConfig({paramSerializer: toParams}).getList(params).then(function(posts){
      $scope.posts = posts;
  }).finally(function() { $scope.loading = false; });

  function sortBy(value) {
    $scope.posts.getList({category: value}).then(function (result) {
      $scope.posts = result;
    });
  }

  function sortValue(value) {
    _.extend($scope.posts.reqParams, {sort: value});
   $state.go('.', {sort: $scope.posts.reqParams.sort}, {notify: false});
    $scope.posts.getList($scope.posts.reqParams).then(function (result) {
    $scope.posts = result;
   });
  }
});
