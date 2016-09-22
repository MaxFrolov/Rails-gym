'use strict';

angular.module('app').run(function(Permission, CurrentUser, $auth, $rootScope, Notification) {
	Permission.defineRole('anonymous', function(role) {
		return !$auth.isAuthenticated();
	});

	_.each(['member', 'admin'], function(role) {
		Permission.defineRole(role, function() {

			return $auth.isAuthenticated();
		});
	});

	$rootScope.$on('$stateChangePermissionDenied', function() {
		Notification.warning('Доступ запрещен!');
	})
});
