'use strict';

/**
 * Directive for list rendering
 */

angular.module('app')
  .directive('avatar', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        user: '='
      },
      link: function (scope) {
        console.log(scope.user)
      },
      templateUrl: 'directives/avatar/avatar.html'
    }
  });
