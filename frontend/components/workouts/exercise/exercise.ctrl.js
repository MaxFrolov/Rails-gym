angular.module('app').controller('ExerciseCtrl', function($scope, Restangular, $stateParams, $sce) {
	$scope.recommendedProducts = Restangular.all('products').all('recommended_products').getList({count: 3}).$object;
	Restangular.one('exercises', $stateParams.id).get().then(function(response) {
		$scope.exercise = response;
		$scope.userLiked = _.some(response.likes, {user_id: $scope.currentUser.id});

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

