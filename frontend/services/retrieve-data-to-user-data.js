'use strict';

angular.module('app').factory('RetrievedData', function() {
	return {
		facebook: function(data) {
			return {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				facebook: data.id,
				facebook_friends_ids: _.pluck(data.friends.data, 'id')
			};
		}
	};
});
