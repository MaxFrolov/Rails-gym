angular.module('app').controller('ExerciseCtrl', function($scope, Restangular, $stateParams, $sce) {
	Restangular.one('exercises', $stateParams.id).get().then(function(response) {
		$scope.exercise = response;

		if ($scope.exercise.type === 'ExerciseVideo') {
			var videoTypes = {
				youtube: 'https://www.youtube.com/embed/' + $scope.exercise.video_id + '?autoplay=1',
				vimeo: 'https://player.vimeo.com/video/' + $scope.exercise.video_id + '?autoplay=1'
			};

			$scope.link = videoTypes[$scope.exercise.service]
		}
	});
	$scope.trustAsHtml = function(string) {
		return $sce.trustAsHtml(string);
	};
});

