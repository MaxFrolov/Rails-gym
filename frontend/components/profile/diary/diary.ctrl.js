angular.module('app').controller('DiaryCtrl', function ($scope, $uibModal, Restangular, $mdDialog, Notification) {
	$scope.daysInMonth = [];
	$scope.clickedDateRecords = [];
	$scope.monthDate = moment().startOf('month');
	$scope.incrementDate = incrementDate;
	$scope.decrementDate = decrementDate;
	$scope.diaryDate = diaryDate;
	$scope.openModal = openModal;
	$scope.showRecords = showRecords;
	$scope.quantityDays = quantityDays();
	$scope.selectDate = selectDate;
	$scope.currentDate = new Date;
	$scope.days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	$scope.diaries = Restangular.one('users', $scope.currentUser.id).all('training_diaries').getList().$object;

	function diaryDate(date) {
		if ($scope.diaries) return _.some($scope.diaries, {date: date.toISOString()})
	}

	function quantityDays() {
		var date = new Date($scope.monthDate);
		var month = date.getMonth();
		$scope.daysInMonth = [];

		while (date.getMonth() == month) {
			var changedDate = new Date(date);
			$scope.daysInMonth.push(changedDate);
			date.setDate(date.getDate()+1);
		}

		var firstDate = _.head($scope.daysInMonth),
			weekDay = moment(firstDate).day() - 1;
		for (var i = 0; i < weekDay; i++) {
			$scope.daysInMonth.unshift('')
		}

		return $scope.daysInMonth;
	}

	function incrementDate() {
		$scope.monthDate = $scope.monthDate.add(1, 'month');
		quantityDays()
	}

	function decrementDate() {
		$scope.monthDate = $scope.monthDate.subtract(1, 'month');
		quantityDays()
	}

	function openModal() {
		$uibModal.open({
			animation: true,
			templateUrl: 'components/profile/diary/exercise-info-modal/exercise-info-modal.html',
			controller: 'ExerciseInfoCtrl',
			size: 'md',
			resolve: {
				date: function() {
					return $scope.dateSelected
				},
				userId: function () {
					return $scope.currentUser.id
				},
				diaries: function () {
					return $scope.diaries
				},
				showRecords: function () {
					return $scope.showRecords
				}
			}
		});
	}

	function showRecords(date) {
		$scope.clickedDateRecords = _.filter($scope.diaries, {date: (date ||$scope.dateSelected).toISOString()});
	}

	function selectDate(date) {
		$scope.dateSelected = date;
	}

	$scope.showConfirm = function(ev, recordId) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title('Вы уверены?')
			.targetEvent(ev)
			.ok('Да')
			.cancel('Нет');
		$mdDialog.show(confirm).then(function() {
			Restangular.one('users', $scope.currentUser.id).one('training_diaries', recordId).remove()
				.then(function() {
					var deletedRecord = _.find($scope.clickedDateRecords, {id: recordId}),
						indexOfDeletedRecord = $scope.clickedDateRecords.indexOf(deletedRecord);
					$scope.clickedDateRecords.splice(indexOfDeletedRecord, 1);
					$scope.diaries = Restangular.one('users', $scope.currentUser.id).all('training_diaries').getList().$object;
					Notification.success('Запись успешно удалена')
			})
		});
	};
})