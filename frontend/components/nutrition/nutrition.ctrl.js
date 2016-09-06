angular.module('app').controller('NutritionCtrl', function ($scope, Restangular, $stateParams, $state) {
	$scope.loading = true;
	$scope.onChangeCategory = onChangeCategory;
	$scope.chosenCategory = '';
	$stateParams.per = 6;
	fetchFoods();

	$scope.refreshCategories = function (search) {
		fetchCategories(search);
	};

	function onChangeCategory(item, model) {
		$scope.chosenCategory = model;
		$stateParams.category_id = model;

		$state.go('.', $stateParams, {notify: false});
		$scope.nutritions.getList($stateParams).then(function (result) {
			$scope.nutritions = result;
		}).finally(function () {
			$scope.loading = false;
		});
	}

	function fetchCategories(search) {
		Restangular.all('food').all('categories').getList({term: search}).then(function (response) {
			$scope.nutritionCategories = response;
			$scope.nutritionCategories.unshift({name: 'Все'})
		});
	}

	function fetchFoods() {
		$scope.loading = true;
		Restangular.all('foods').getList($stateParams)
			.then(function (nutrition) {
				$scope.nutritions = nutrition;
			})
			.finally(function () {
				$scope.loading = false;
			});
	}
});
