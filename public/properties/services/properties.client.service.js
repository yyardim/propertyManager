(function (ng) {
    'use strict';
    
    var inject = ['$resource'];
    
    function propertiesFactory($resource) {
        return $resource('api/properties/:propertyId', {
            propertyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
    
    propertiesFactory.$inject = inject;
    
    ng.module('properties')
        .factory('Properties', propertiesFactory);    
    
})(window.angular);