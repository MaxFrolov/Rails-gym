'use strict';

/* Controllers */

angular.module('app').controller('AppCtrl', function($scope, $auth, $state, CurrentUser, Notification, currentUser, $rootScope,
                                                     RetrievedData) {
  $scope.currentUser = currentUser;
  $scope.logout = logout;
  $scope.activeNestedChild = activeNestedChild;
  $scope.socialSignUp = socialSignUp;

  window.SmoothScroll({animationTime: 800, stepSize: 120});

  function socialSignUp(provider) {
    $auth.oauthData(provider).then(function(response) {
      $state.go('app.inner-layout.signUp', {user: RetrievedData[provider](response.data.resource)});
    });
  }

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
        shop: 'Магазин',
        gallery: 'Галлерея',
        login: 'Вход',
        'sign-up': 'Регистрация',
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
    $state.go('app.main');
  }

  $scope.$on("$stateChangeStart", function() {
    console.log('helloo i"m changed')
  });
});
