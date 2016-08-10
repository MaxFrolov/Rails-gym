angular.module('app').controller('ProfileHomeCtrl', function($scope, $http, Notification, Restangular) {
	$scope.refreshChart = refreshChart;
	$scope.exerciseSelect = '';
	$scope.seriesShow = false
	$scope.startDate = new Date(moment().subtract(6, 'days'));
	$scope.endDate = new Date(moment());
	$scope.exerciseList = []
	$scope.exercises_categories = {
		bench_press: 'Жим лежа',
		bench_press_on_an_incline_bench: 'Жим на наклонной'
	};
	fetchStats();

	$scope.exerciseField = {
		name: 'exercises',
		label: 'Выберите упражнение',
		onChange: function (item, model) {
			$scope.exerciseSelect = model;
			$scope.series = [item.title];
			$scope.seriesShow = true
		}
	};

	$scope.refreshExercises = function(search) {
		Restangular.all('list_of_exercises').getList({term: search}).then(function(response) {
			$scope.exerciseList = response
		})
	}

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
				$scope.pieLabels = response.data.exercises_categories
			});
	}

	$scope.options = {
		scales: {
			xAxes: [{
				type: 'linear',
				position: 'bottom'
			}]
		}
	};
});
