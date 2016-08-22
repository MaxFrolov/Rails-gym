angular.module('app').controller('PostsCtrl',function($scope, Restangular, $stateParams, $state, toParams) {
  $scope.sortValue = sortValue;
  $scope.sortBy = sortBy;
  $scope.loading = true;
  $scope.categoryFields= [
    {
     name: 'Программы',
     value: 0
    },
    {
     name: 'Растягивание',
     value: 1
    },
    {
     name: 'Упражнения',
     value: 2
    },
    {
     name: 'Кардио',
     value: 3
    },
    {
      name: 'Мышечные группы',
      value: 4
    },
    {
      name: 'Советы и рекомендации',
      value: 5
    },
    {
      name: 'Спортивные клубы',
      value: 6
    },
    {
      name: 'Тренажеры',
      value: 7
    },
    {
      name: 'Исследования',
      value: 8
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
    $scope.posts.getList({category_id: value}).then(function (result) {
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
