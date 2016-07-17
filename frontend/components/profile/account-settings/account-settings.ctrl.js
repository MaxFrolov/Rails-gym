angular.module('app').controller('ProfileSettingsCtrl', function($scope, Restangular, $timeout) {
	$scope.personalDetails = _.pick($scope.currentUser, 'first_name', 'last_name', 'phone', 'email')
	$scope.errors = {}
	$scope.fields = [
			{
				name: 'first_name',
				label: 'Имя'
			},
			{
				name: 'last_name',
				label: 'Фамилия'
			},
			{
				name: 'email',
				label: 'Email'
			},
			{
				name: 'phone',
				label: 'Телефон',
				type: 'phone'
			}
	]

	$scope.onSubmit = onSubmit

	function onSubmit (data) {

	}
})
