angular.module('app').config(function(uibPaginationConfig) {
  _.merge(uibPaginationConfig, {
    boundaryLinks: true,
    directionLinks: false,
    maxSize: 5
  });
});
