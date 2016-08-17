angular.module('app').directive('likes', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/likes/likes.html',
		scope: {
			targetType: '@',
			currentUser: '=',
			resource: '=',
			userLiked: '='
		},
		controller: function ($scope, Restangular, Notification) {
			$scope.clicked = clicked;
			$scope.setLike = setLike;
			$scope.removeLike = removeLike;
			var likes;

			function clicked() {
				if (!$scope.currentUser.id) {
					Notification.error('Зарегистрируйстесь что бы оставить like');
					return false;
				}

				likes = $scope.resource.likes;
				var userLiked = _.some(likes, {user_id: $scope.currentUser.id});
				$scope.data = {
					target_id: $scope.resource.id,
					target_type: $scope.targetType
				};

				userLiked ? removeLike() : setLike();
			}

			function setLike() {
				Restangular.one('users', $scope.currentUser.id).all('likes').customPOST($scope.data).then(function (like) {
					likes.push(like);
					$scope.resource.likes_count++;
					$scope.likes = 1;
					$scope.userLiked = true;
				});
			}

			function removeLike() {
				var likeId = _.find($scope.resource.likes, {user_id: $scope.currentUser.id});
				$scope.removeLike = Restangular.one('users', $scope.currentUser.id).one('likes', likeId.id).remove()
					.then(function () {
						likes.splice(likes.length - 1, 1);
						$scope.resource.likes_count--;
						$scope.userLiked = false;
				})
			}
		}
	}
});
