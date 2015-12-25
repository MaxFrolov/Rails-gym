angular.module('app').controller('SignUpCtrl', function($scope, $http, $auth, $state, CurrentUser) {
  $scope.user = {};
  $scope.errors = {};
  $scope.signUp = signUp;

  $scope.fields = [
    {
      name: 'first_name',
      label: 'Имя'
    },
    {
      name: 'last_name',
      label: 'Фамилия'
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'birthday',
      label: 'Рождение',
      type: 'birthday'
    },
    {
      name: 'password',
      label: 'Введите пароль',
      type: 'password'
    },
    {
      name: 'password_confirmation',
      label: 'Подтвердите пароль',
      type: 'password'
    }
  ];

  function signUp() {
    $http.post('/api/registration', {user: $scope.user}).then(function(responce) {
      $auth.setToken(responce.data.auth_token);
      CurrentUser.reload().then(function() {
        $state.go('app.blog.posts');
      }).catch(function(response) {
        $scope.errors = response.errors;
      });
    });
  }
});
