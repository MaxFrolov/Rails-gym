angular.module('app').controller('ProfileHomeCtrl', function($scope, $http, Notification) {
	$scope.refreshChart = refreshChart;
	$scope.exerciseSelectObj = '';
	$scope.startDate = '';
	$scope.endDate = '';
	$scope.exercises_categories = {
		bench_press: 'Жим лежа',
		bench_press_on_an_incline_bench: 'Жим на наклонной'
	};

	$http.get('/api/users/' + $scope.currentUser.id + '/training_diaries/diary_stats').then(function(response) {
		$scope.lineData = response.data.weights;
		$scope.labels = response.data.dates;
		$scope.pieData = response.data.exercises_count;
		if (_.get(response, 'data.exercises_categories')) {
			$scope.pieLabels = response.data.exercises_categories.map(function(item) { return $scope.exercises_categories[item] })
		}
	});

	$scope.exerciseField = {
		name: 'exercises',
		label: 'Выберите упражнение',
		type: 'select',
		choices: [
			{label: 'Жим лежа', value: 0},
			{label: 'Жим на наклонной скамье', value: 1}
		],
		onChange: function (item, model) {
			$http.get('/api/users/' + $scope.currentUser.id + '/training_diaries/diary_stats', {params: {exercise: model}})
				.then(function(response) {
				$scope.lineData = response.data.weights;
				$scope.labels = response.data.dates;
			});
		}
	}

	function refreshChart() {
		if (!$scope.startDate || !$scope.endDate) {
			Notification.error('Зполните пожалуйста все данные...')
		}
	}
});
