(function (ng) {
  'use strict';
  
  var inject = ['$scope', '$routeParams', '$location', 'Authentication', 'Properties'];

  function propertiesController($scope, $routeParams, $location, Authentication, Properties) {
    var vm = this;

    vm.authentication = Authentication;
    vm.create = createProperty;
    vm.find = findProperties;
    vm.findOne = findProperty;
    vm.update = updateProperty;
    vm.delete = deleteProperty;
    
    function createProperty() {
      var property = new Properties({
        name: this.name
      });
      
      // $save([params], [success], [error])
      property.$save(function(response) {
        $location.path('properties/' + response._id);
      }, function(errorResponse) {
        vm.error = errorResponse.data.message;
      });
    };
    
    function findProperties() {
      vm.properties = Properties.query();
    };
    
    function findProperty() {
      vm.property = Properties.get({
        propertyId: $routeParams.propertyId
      });
    };
    
    function updateProperty() {
      vm.property.$update(function() {
        $location.path('properties/' + vm.property._id);
      }, function(errorResponse) {
        vm.error = errorResponse.data.message;
      });
    };
    
    function deleteProperty(property) {
      if (property) {
        property.$remove(function() {
          for (var i in vm.properties) {
            if (vm.properties[i] === property) {
              vm.properties.splice(i, 1);
            }
          }
        });
      } else {
        vm.property.$remove(function() {
          $location.path('properties');
        });
      }
    };
  }

  propertiesController.$inject = inject;

  ng.module('properties')
    .controller('PropertiesController', propertiesController);

})(window.angular);