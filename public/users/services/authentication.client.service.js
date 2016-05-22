(function(ng) {
	'use strict';
	
	var inject = [];
	
	function usersFactory() {
		var vm = this;
		
		vm.user = window.user;
		
		return {
			user: vm.user
		};
	}
	
	usersFactory.$inject = inject;
	
	ng.module('users')
		.factory('Authentication', [usersFactory]);

})(window.angular);