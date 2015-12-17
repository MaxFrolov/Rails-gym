'use strict';

/* Controllers */

angular.module('app').controller('AppCtrl', function($scope, $auth, $state, CurrentUser, Notification, currentUser) {
  $scope.currentUser = currentUser;
  $scope.logout = logout;

  function logout() {
    $auth.logout();
    CurrentUser.reload();
    Notification.success('Successfully logged out');
    $state.go('main');
  }
});
