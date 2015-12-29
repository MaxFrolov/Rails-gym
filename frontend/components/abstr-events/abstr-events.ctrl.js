angular.module('app').controller('AbstrEventsCtrl', function($scope, Restangular, $stateParams) {
  $scope.events = Restangular.all('events').getList({page: $stateParams.page, per: 4}).$object
});
