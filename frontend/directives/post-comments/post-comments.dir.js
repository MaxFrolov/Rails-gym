angular.module('app').directive('postComments', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/post-comments/post-comments.html',
    scope: {
      comments: '=',
      currentUser: '='
    },
    controller: function($scope, Restangular, $stateParams, Notification, $state) {
      $scope.saveComment = saveComment;
      var param = $state.includes('app.blog.*')? 'post_id' : 'food_id';
      $scope.comment = {
        comment_date: new Date()
      };
      $scope.params = {};
      $scope.errors = {};
      $scope.comment[param] = $stateParams.id;
      $scope.params[param] = $stateParams.id;

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
            Restangular.all('comments').getList($scope.params).then(function(responce) {
              $scope.comments = responce;
              console.log(responce)
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
