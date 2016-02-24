angular.module('app').directive('postComments', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/post-comments/post-comments.html',
    scope: {
      comments: '=',
      currentUser: '=',
      target: '@'
    },
    controller: function($scope, Restangular, $stateParams, Notification) {

      $scope.comment = {
        name: $scope.currentUser.first_name,
        email: $scope.currentUser.email
      };

      $scope.saveComment = saveComment;
      $scope.params = {};
      $scope.errors = {};

      $scope.fields = [
        {
          name: 'name',
          label: 'Имя',
          inline: true,
          disabled: true
        },
        {
          name: 'email',
          label: 'Email',
          inline: true,
          disabled: true
        },
        {
          name: 'message',
          label: 'Комментарий',
          type: 'textarea',
          clear: true
        }
      ];

      function saveComment() {
        Restangular.one($scope.target,  $stateParams.id).one('users', $scope.currentUser.id).all('comments').customPOST($scope.comment)
          .then(function() {
            $scope.comment.message = "";
            Notification.success('Коментарий был успешно добавлен');
            Restangular.one($scope.target,  $stateParams.id).all('comments').getList().then(function(responce) {
              $scope.comments = responce;
            });
          })
          .catch(function (response) {
            $scope.errors = response.data.errors;
            Notification.error('Что то пошло не так при отправке комментария');
          })
      }
    }
  }
});
