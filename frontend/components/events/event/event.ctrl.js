angular.module('app').controller('EventCtrl', function($scope, $stateParams, Restangular) {
  Restangular.one('events', $stateParams.id).get().then(function(responce) {
    $scope.event = responce;
  })
});
