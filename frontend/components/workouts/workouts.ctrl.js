angular.module('app').controller('WorkoutsCtrl', function($scope, Restangular) {
	$scope.workouts = Restangular.all('workouts').getList().$object;
});