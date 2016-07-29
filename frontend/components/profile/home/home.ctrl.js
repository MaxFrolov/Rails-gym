angular.module('app').controller('ProfileHomeCtrl', function($scope, $http, Notification) {
	$scope.refreshChart = refreshChart;
	$scope.exerciseSelect = 0;
	$scope.startDate = new Date(moment().subtract(1, 'month'));
	$scope.endDate = new Date(moment());
	$scope.exercises_categories = {
		bench_press: 'Жим лежа',
		bench_press_on_an_incline_bench: 'Жим на наклонной'
	};
	fetchStats();

	$scope.exerciseField = {
		name: 'exercises',
		label: 'Выберите упражнение',
		type: 'select',
		choices: [
			{label: 'Жим лежа', value: 0},
			{label: 'Жим на наклонной скамье', value: 1}
		],
		onChange: function (item, model) {
			$scope.exerciseSelect = model;
		}
	};

	function refreshChart(startDate, endDate) {
		if (!startDate || !endDate) {
			return Notification.error('Зполните пожалуйста все данные...')
		}

		fetchStats(startDate, endDate)
	}

	function fetchStats(startDate, endDate) {
		var params = {
			start_period: moment(startDate || $scope.startDate).format('YYYY-MM-DD'),
			end_period: moment(endDate || $scope.endDate).format('YYYY-MM-DD'),
			exercise: $scope.exerciseSelect
		};

		$http.get('/api/users/' + $scope.currentUser.id + '/training_diaries/diary_stats', {params: params})
			.then(function(response) {
				$scope.lineData = response.data.weights;
				$scope.labels = response.data.dates;
				$scope.pieData = response.data.exercises_count;
				if (_.get(response, 'data.exercises_categories')) {
					$scope.pieLabels = response.data.exercises_categories.map(function(item) {
						return $scope.exercises_categories[item]
					})
				}
			});
	}
});
