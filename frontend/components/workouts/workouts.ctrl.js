angular.module('app').controller('WorkoutsCtrl', function($scope, Restangular, $stateParams, $state) {
	$stateParams.per = 4;
	$scope.workouts = Restangular.all('workouts').getList($stateParams).$object;
	Restangular.all('workout').all('categories').getList().then(function(response) {
		$scope.workoutsCategories = response;
		$scope.workoutsCategories.unshift({name: 'Все'})
	});
	$scope.sortByCategory = sortByCategory;
	$scope.sortByLevel = sortByLevel;


	function sortByCategory(value) {
		$stateParams.category_id = value;
		fetchWorkouts()
	}

	function sortByLevel(value) {
		$stateParams.level = value;
		fetchWorkouts()
	}

	function fetchWorkouts() {
		$state.go('.', $stateParams, {notify: false});
		$scope.workouts.getList($stateParams).then(function (result) {
			$scope.workouts = result;
		});
	}

	$scope.levelFields = [
		{ name: 'Любой' },
		{ value: 'beginner', name: 'Новичек' },
		{ value: 'intermediate', name: 'Сердний' },
		{ value: 'advanced', name: 'Продвинутый' }
	]
});
