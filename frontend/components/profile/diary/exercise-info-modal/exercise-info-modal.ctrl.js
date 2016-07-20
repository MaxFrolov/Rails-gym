angular.module('app').controller('ExerciseInfoCtrl', function($scope, Restangular, Notification, date, userId, diaries) {
	$scope.setsQuantity = setsQuantity;
	$scope.ok = ok;
	$scope.exerciseInfo = {};
	$scope.errors = {};
	$scope.modalOptions = {
		title: 'Для добавления новго упражнения заполните форму',
		buttons: ['ok', 'cancel']
	};

	$scope.fields = [
		{
			name: 'exercise',
			label: 'Упражнение',
			type: 'select',
			choices: [
				{label: 'Жим лежа', value: 'bench_press'},
				{label: 'Жим на наклонной скамье', value: 'bench_press_on_an_incline_bench'}
			]
		}
	];

	function setsQuantity() {
		$scope.setsInfo = [];

		for (var i = 0; i < $scope.exerciseInfo.sets; i++) {
			$scope.setsInfo.push({})
		}
	}

	function ok() {
		$scope.exerciseInfo.training_diary_exercises_attributes = $scope.setsInfo;
		$scope.exerciseInfo.date = date;
		Restangular.one('users', userId).all('training_diaries').customPOST($scope.exerciseInfo).then(function (response) {
			diaries.push(response)
			$scope.$dismiss('cancel');
			Notification.success('Запись успешно сохранена!');
		});
	}
});
