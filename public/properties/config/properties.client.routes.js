(function(ng) {
  'use strict';
  
  var inject = ['$routeProvider'];
  
  function config($routeProvider) {
    $routeProvider.
      when('/properties', {
        templateUrl: 'properties/views/list-properties.client.view.html'
      }).
      when('/properties/create', {
        templateUrl: 'properties/views/create-property.client.view.html'
      }).
      when('/properties/:propertyId', {
        templateUrl: 'properties/views/view-property.client.view.html'
      }).
      when('/properties/:propertyId/edit', {
        templateUrl: 'properties/views/edit-property.client.view.html'
      });
  }
  
  config.$inject = inject;
  
  ng.module('properties')
    .config(config);

})(window.angular);