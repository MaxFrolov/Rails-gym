'use strict';

/**
 * Config for the restangular
 */
angular.module('app')
  .config(function(NotificationProvider) {
    NotificationProvider.setOptions({
      startTop: 20,
      startRight: 20,
      positionX: 'left',
      positionY: 'bottom'
    });
  });
