angular.module('app').controller('PostCtrl', function($scope, Restangular, $stateParams) {
  $scope.comment = {};

  Restangular.one('posts', $stateParams.id).get().then(function(responce) {
    $scope.currentPost = responce;
  });

  Restangular.all('comments').getList({post_id: $stateParams.id}).then(function(responce) {
    $scope.comments = responce;
  });

  $scope.fields = [
    {
      name: 'Name',
      label: 'Имя'
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'message',
      label: 'Комментарий',
      type: 'textarea'
    }
  ]
});
