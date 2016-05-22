(function(ng, Authentication) {
	'use strict';

	function usersFactory() {
		this.user = window.user;
		
		return {
			user: this.user
		};
	}
	
	ng.module('users')
		.factory('Authentication', [usersFactory]);

})(window.angular);