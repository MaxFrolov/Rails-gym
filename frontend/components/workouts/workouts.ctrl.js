angular.module('app').controller('WorkoutsCtrl', function($scope, Restangular) {
	$scope.workouts = Restangular.all('workouts').getList().$object;
	$scope.categoryFields = [
		{ value: 'fat_burning', name: 'Сжигание жира' },
		{ value: 'cardio', name: 'Кардио' },
		{ value: 'body_weight', name: 'Нбор массы' }
	]
	$scope.levelFields = [
		{ value: 'beginner', name: 'Новичек' },
		{ value: 'intermediate', name: 'Сердний' },
		{ value: 'advanced', name: 'Продвинутый' }
	]
});
