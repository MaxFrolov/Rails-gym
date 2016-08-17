angular.module('app').controller('ExerciseInfoEditCtrl', function($scope, Restangular, Notification, date, userId, diaries, showRecords, editedRecord) {
	$scope.ok = ok;
	$scope.exerciseSelect = editedRecord.exercise_id;
	$scope.exerciseMeasuring = editedRecord.measuring;
	$scope.exerciseList = [];
	$scope.exerciseInfo = {};
	$scope.exerciseInfo.sets = editedRecord.sets
	$scope.errors = {};
	$scope.setsQuantity = setsQuantity;
	$scope.modalOptions = {
		title: 'Внесите изменения и сохраните форму',
		buttons: ['ok', 'cancel']
	};

	initialSetsQuantity();

	$scope.refreshExercises = function(search) {
		Restangular.all('list_of_exercises').getList({term: search}).then(function(response) {
			$scope.exerciseList = response
		})
	};

	$scope.exerciseListField = {
		name: 'exercise',
		label: 'Упражнение',
		onChange: function(item, model) {
			$scope.exerciseSelect = model;
			$scope.exerciseMeasuring = item.measuring;
		}
	};

	function initialSetsQuantity() {
		$scope.setsInfo = [];
		var setsInfoType = $scope.exerciseMeasuring !== 'blank' ? $scope.exerciseMeasuring : undefined;

		for (var i = 0; i < $scope.exerciseInfo.sets; i++) {
			var setsInfoObj = {
				repetition: editedRecord.training_diary_exercises[i].repetition,
				id: editedRecord.training_diary_exercises[i].id
			};
			setsInfoObj[setsInfoType] = editedRecord.training_diary_exercises[i][setsInfoType];
			$scope.setsInfo.push(setsInfoObj)
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
		Restangular.one('users', userId).one('training_diaries', editedRecord.id).customPUT($scope.exerciseInfo).then(function (response) {
			var updatedDiary = _.findIndex(diaries, function(o) { return o.id == response.id; });
			diaries[updatedDiary] = response;
			showRecords();
			$scope.$dismiss('cancel');
			Notification.success('Запись успешно обновлена!');
		});
	}
});
