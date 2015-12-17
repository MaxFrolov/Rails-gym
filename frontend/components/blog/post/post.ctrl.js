angular.module('app').controller('PostCtrl', function($scope, Restangular, $stateParams, Notification, $stateParams) {
  $scope.comment = {
    post_id: $stateParams.id
  };
  $scope.errors = {};
  $scope.saveComment = saveComment;

  Restangular.one('posts', $stateParams.id).get().then(function(responce) {
    $scope.currentPost = responce;
  });

  Restangular.all('comments').getList({post_id: $stateParams.id}).then(function(responce) {
    $scope.comments = responce;
  });

  $scope.fields = [
    {
      name: 'name',
      label: 'Имя',
      hideLabel: true
    },
    {
      name: 'email',
      label: 'Email',
      hideLabel: true
    },
    {
      name: 'message',
      label: 'Комментарий',
      type: 'textarea',
      hideLabel: true
    }
  ];

  function saveComment() {
    Restangular.one('users', $scope.currentUser.id).all('comments').customPOST($scope.comment)
      .then(function(responce) {

        Notification.success('Коментарий был успешно добавлен');
        $scope.comment.name = "";
        $scope.comment.email = "";
        $scope.comment.message = "";
        console.log(responce)
      })
      .catch(function (response) {
        $scope.errors = response.data.errors;
        Notification.error('Что то не пошло не так при отправке комментария');
      })
  }
});

