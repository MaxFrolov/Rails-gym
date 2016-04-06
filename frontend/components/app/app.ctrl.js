'use strict';

/* Controllers */

angular.module('app').controller('AppCtrl', function($scope, $auth, $state, CurrentUser, Notification, currentUser, $rootScope) {
  $scope.currentUser = currentUser;
  $scope.logout = logout;
  $scope.activeNestedChild = activeNestedChild;
  changeTitles();

  $rootScope.$on('$stateChangeSuccess', function() {
    changeTitles();
  });

  function changeTitles() {
    $scope.stateHeader = '';
    var currentPath = $state.$current.url.sourcePath,
      titles = {
        blog: 'Блог',
        nutrition: 'Питание',
        events: 'События',
        shop: 'Магазин',
        gallery: 'Галлерея',
        login: 'Вход',
        'sign-up': 'Регистрация',
        profile: 'Профиль',
        workouts: 'Тренировки',
        exercises: 'Упражнения'
      };

    _.each(titles, function(title, key) {
      if (currentPath.indexOf(key) !== -1) {
        $scope.stateHeader = title;
      }
    });
  }

  function activeNestedChild(pathName) {
    var currentPath = $state.$current.url.sourcePath;

    return currentPath.indexOf(pathName) !== -1;
  }

  function logout() {
    $auth.logout();
    CurrentUser.reload();
    Notification.success('Successfully logged out');
    $state.go('main');
  }
});
