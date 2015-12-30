'use strict';

/* Controllers */

angular.module('app').controller('AppCtrl', function($scope, $auth, $state, CurrentUser, Notification, currentUser) {
  $scope.currentUser = currentUser;
  $scope.logout = logout;
  $scope.activeNestedChild = activeNestedChild;

  function activeNestedChild(state) {
    if ($state.includes('app.blog.*')) {
      $scope.stateHeader = 'Блог';
    } else if ($state.includes('app.nutrition.*')) {
      $scope.stateHeader = 'Питание';
    } else if ($state.includes('app.abstract-events.*')) {
      $scope.stateHeader = 'События';
    } else if ($state.includes('app.shop.*')) {
      $scope.stateHeader = 'Магазин';
    } else {
      $scope.stateHeader = ''
    }
    return $state.includes(state)
  }

  function logout() {
    $auth.logout();
    CurrentUser.reload();
    Notification.success('Successfully logged out');
    $state.go('main');
  }
});
