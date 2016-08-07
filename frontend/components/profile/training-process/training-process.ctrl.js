angular.module('app').controller('ProfileTrainingCtrl', function($scope, Restangular) {
	$scope.daysInMonth = [];
	$scope.showAllExercises = false;
	$scope.monthDate = moment().startOf('month');
	$scope.incrementDate = incrementDate;
	$scope.decrementDate = decrementDate;
	$scope.trainingDate = trainingDate;
	$scope.showRecords = showRecords;
	$scope.quantityDays = quantityDays();
	$scope.selectDate = selectDate;
	$scope.selectWeek = selectWeek;
	$scope.currentDate = new Date;

	$scope.trainings = Restangular.one('users', $scope.currentUser.id).all('users_trainings').getList().$object

	function trainingDate(date) {
		const clearedDate = moment(date).format('YYYY-MM-DD');
		if ($scope.trainings) return _.some($scope.trainings, {date: new Date(clearedDate).toISOString()})
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

	function showRecords(date) {
		$scope.vewDate = moment(date).format('MM-DD-YYYY');
		var clearedDate = moment(date).format('YYYY-MM-DD');
		$scope.clickedDateRecords = _.find($scope.trainings, {date: new Date(clearedDate).toISOString()});
	}

	function selectDate(date) {
		$scope.dateSelected = date;
		$scope.showAllExercises = true;
	}

	function selectWeek (date) {
		var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
		 currentPlaceInWeek = moment(date).day(),
		 indexCurrentDate = $scope.daysInMonth.indexOf(date),
		 beginOfTheWeek = indexCurrentDate - currentPlaceInWeek + 1,
		 weekDays = $scope.daysInMonth.slice(beginOfTheWeek, beginOfTheWeek + 7)
		$scope.weekDaysRecords = weekDays.map(function(item, index) {
			var clearedDate = moment(item).format('YYYY-MM-DD'),
				currentDayRecord =	_.find($scope.trainings, {date: new Date(clearedDate).toISOString()});
			return {date: item, day: days[index], record: currentDayRecord }
		})
		console.log($scope.weekDaysRecords)
	}
})
