angular.module('app').controller('ExercisesCtrl', function($scope, Restangular, $stateParams) {
	$scope.exercises = Restangular.all('exercises').getList({id: $stateParams.id}).$object;
});