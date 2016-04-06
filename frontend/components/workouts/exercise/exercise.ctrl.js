angular.module('app').controller('ExerciseCtrl', function($scope, Restangular, $stateParams) {
	$scope.exercise = Restangular.one('exercises', $stateParams.id).get().$object;
});