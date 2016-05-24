(function(ng) {
	'use strict';
	
	var appModuleName = 'prprtymngr';
	var appModule = ng.module(appModuleName, [
		'ngResource',
		'ngRoute',
		'users',
		'example',
		'properties'
	]);
	
	appModule.config(['$locationProvider', function ($locationProvider){
		$locationProvider.hashPrefix('!');
	}]);
	
	// Fix Facebook's OAuth bug
	//if (window.location.hash === '#_=_') window.location.hash = '#!';
	
	ng.element(document).ready(function() {
		ng.bootstrap(document, [appModuleName]);
	});
	
})(window.angular);