(function(ng) {
	'use strict';
	
	var appModuleName = 'prptymngr';
	var appModule = ng.module(appModuleName, [
		'ngRoute',
		'users',
		'example'
	]);
	
	appModule.config(['$locationProvider', function ($locationProvider){
		$locationProvider.hashPrefix('!');
	}]);
	
	// Fix Facebook's OAuth bug
	if (window.location.hash === '#_=_') window.location.hash = '#!';
	
	ng.element(document).ready(function() {
		ng.bootstrap(document, [appModuleName]);
	});
	
})(window.angular);