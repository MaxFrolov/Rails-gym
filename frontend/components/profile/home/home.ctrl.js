angular.module('app').controller('ProfileHomeCtrl', function($scope, $http) {
	$http.get('/api/users/' + $scope.currentUser.id + '/training_diaries/diary_stats').then(function(response) {
		$scope.lineData = response.data.weights;
		$scope.labels = response.data.dates;
		$scope.pieData = response.data.exercises_count;
		$scope.pieLabels = response.data.exercises_categories;
	});

	$scope.exerciseSelectObj = {};

	$scope.fields = [
		{
			name: 'exercises',
			label: 'Выберите упражнение',
			type: 'select',
			choices: [
				{label: 'Жим лежа', value: 'bench_press'},
				{label: 'Жим на наклонной скамье', value: 'bench_press_on_an_incline_bench'}
			]
		}
	];

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
});
