angular.module('app')
	.directive('noItemPlaceholder', function () {
		return {
			restrict: 'E',
			scope: {
				text: '@'
			},
			templateUrl: 'directives/no-item-placeholder/no-item-placeholder.html'
		};
	});
