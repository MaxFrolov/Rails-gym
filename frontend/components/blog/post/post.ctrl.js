angular.module('app').controller('PostCtrl', function($scope, Restangular, Notification, $stateParams) {
  $scope.comment = {
    post_id: $stateParams.id,
    comment_date: new Date()
  };

  $scope.errors = {};
  $scope.getComments = getComments();
  $scope.saveComment = saveComment;

  Restangular.one('posts', $stateParams.id).get().then(function(responce) {
    $scope.currentPost = responce;
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
      .then(function() {
        Notification.success('Коментарий был успешно добавлен');
        getComments();
        $scope.comment.name = "";
        $scope.comment.email = "";
        $scope.comment.message = "";
      })
      .catch(function (response) {
        $scope.errors = response.data.errors;
        Notification.error('Что то пошло не так при отправке комментария');
      })
  }

  function getComments() {
    Restangular.all('comments').getList({post_id: $stateParams.id}).then(function(responce) {
      $scope.comments = responce;
    });
  }
});

