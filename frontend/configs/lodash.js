'use strict';

/**
 * Allows using lodash in controllers/views/directives
 */
angular.module('app').run(function ($rootScope) {
  $rootScope._ = window._;
});
