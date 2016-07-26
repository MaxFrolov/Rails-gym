angular.module('app').controller('DiaryCtrl', function ($scope, $uibModal, Restangular) {
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
	$scope.exercisesTypes = {
		bench_press: 'Жим лежа',
		bench_press_on_an_incline_bench: 'Жим на наклонной скамье'
	}

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
				}
			}
		});
	}

	function showRecords(date) {
		$scope.clickedDateRecords = _.filter($scope.diaries, {date: date.toISOString()});
	}

	function selectDate(date) {
		$scope.dateSelected = date;
	}
})