angular.module('app').controller('EventsCtrl', function($scope, Restangular, $stateParams) {
    $scope.events = Restangular.all('events').getList({page: $stateParams.page, per: 4}).$object;
});
