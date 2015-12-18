'use strict';

angular.module('app').controller('LoginCtrl', function($scope, $state, $auth, Notification, CurrentUser) {
  $scope.logIn = logIn;
  $scope.authenticate = authenticate;
  $scope.user = {};

  $scope.fields = [
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password'
    },
    {
      name: 'remember_me',
      checkboxLabel: 'Запомнить меня',
      type: 'checkbox'
    }
  ];

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(loginSuccessCallback)
      .catch(authErrorCallback);
  }

  function logIn() {
    $auth.login({ user: $scope.user })
      .then(loginSuccessCallback)
      .catch(loginErrorCallback);
  }

  function loginSuccessCallback() {
    $scope.errors = {};
    CurrentUser.reload().then(function () {
      Notification.success('You were successfully logged in.');
      $state.go('app.blog');
    });
  }

  function loginErrorCallback(response) {
    _.each(response.data.errors, function(message) {
      Notification.error(message)
    });
  }

  function authErrorCallback() {
    Notification.error('You have to be registered on site.')
  }
});
