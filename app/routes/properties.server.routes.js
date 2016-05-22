'use strict';

var users = require('../controllers/users.server.controller'),
    properties = require('../controllers/properties.server.controller');

module.exports = function (app) {
    app.route('/api/properties')
        .get(properties.list)
        .post(users.requiresLogin, properties.create);
    
    app.route('/api/properties/:propertyId')
        .get(properties.read)
        .put(users.requiresLogin, properties.hasAuthorization, properties.update)
        .delete(users.requiresLogin, properties.hasAuthorization, properties.delete);

    app.param('propertyId', properties.propertyById);
};