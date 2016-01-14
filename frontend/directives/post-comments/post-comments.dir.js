angular.module('app').directive('postComments', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/post-comments/post-comments.html',
    scope: {
      comments: '=',
      currentUser: '='
    },
    controller: function($scope, Restangular, $stateParams, Notification, $state) {

      var param = $state.includes('app.blog.*')? 'post_id' : 'food_id';

      $scope.comment = {
        comment_date: new Date(),
        name: $scope.currentUser.first_name,
        email: $scope.currentUser.email
      };

      $scope.saveComment = saveComment;
      $scope.params = {};
      $scope.errors = {};
      $scope.comment[param] = $stateParams.id;
      $scope.params[param] = $stateParams.id;

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
        Restangular.one('users', $scope.currentUser.id).all('comments').customPOST($scope.comment)
          .then(function() {
            Notification.success('Коментарий был успешно добавлен');
            Restangular.all('comments').getList($scope.params).then(function(responce) {
              $scope.comments = responce;
            });
            $scope.comment.name = "";
            $scope.comment.email = "";
            $scope.comment.message = "";
          })
          .catch(function (response) {
            $scope.errors = response.data.errors;
            Notification.error('Что то пошло не так при отправке комментария');
          })
      }
    }
  }
});
