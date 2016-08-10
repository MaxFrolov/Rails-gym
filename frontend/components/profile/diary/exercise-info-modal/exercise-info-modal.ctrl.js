angular.module('app').controller('ExerciseInfoCtrl', function($scope, Restangular, Notification, date, userId, diaries) {
	$scope.setsQuantity = setsQuantity;
	$scope.ok = ok;
	$scope.exerciseSelect = ''
	$scope.exerciseList = []
	$scope.exerciseInfo = {};
	$scope.errors = {};
	$scope.modalOptions = {
		title: 'Для добавления новго упражнения заполните форму',
		buttons: ['ok', 'cancel']
	};

	$scope.refreshExercises = function(search) {
		Restangular.all('list_of_exercises').getList({term: search}).then(function(response) {
			$scope.exerciseList = response
		})
	}

	$scope.exerciseListField = {
		name: 'exercise',
		label: 'Упражнение',
		onChange: function(item, model) {
			$scope.exerciseSelect = model
			$scope.exerciseMeasuring = item.measuring
		}
	}

	function setsQuantity() {
		$scope.setsInfo = [];

		for (var i = 0; i < $scope.exerciseInfo.sets; i++) {
			$scope.setsInfo.push({})
		}
	}

	function ok() {
		$scope.exerciseInfo.training_diary_exercises_attributes = $scope.setsInfo;
		$scope.exerciseInfo.date = date;
		Restangular.one('users', userId).one('list_of_exercises', $scope.exerciseSelect).all('training_diaries').customPOST($scope.exerciseInfo).then(function (response) {
			diaries.push(response)
			$scope.$dismiss('cancel');
			Notification.success('Запись успешно сохранена!');
		});
	}
});
