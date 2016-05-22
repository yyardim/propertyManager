(function(ng){
	'use strict';
	
	var inject = ['$scope', 'Authentication'];

	function exampleController($scope, Authentication) {
		var vm = this;
		
		init();
		
		function init() {
			vm.authentication = Authentication;
		}
	}
	
	exampleController.$inject = inject;
	
	ng.module('example')
		.controller('ExampleController', exampleController);

})(window.angular);