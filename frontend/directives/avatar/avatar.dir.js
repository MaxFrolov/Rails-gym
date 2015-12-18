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
      templateUrl: 'directives/avatar/avatar.html'
    }
  });
