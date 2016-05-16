// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'users' controller
var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'signup' routes
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    
    // Set up the 'signin' routes
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    // Set up the 'signout' route
    app.get('/signout', users.signout);
        
    // Set up the 'users' base routes 
    app.route('/users')
        .post(users.create)
        .get(users.list); 
        
    // Set up the 'users' parameterized routes
     app.route('/users/:userId')
         .get(users.read)
         .put(users.update)
         .delete(users.delete);
        
    //app.route('/users/:username')
    //    .get(users.read)
    //    .put(users.update)
    //     .delete(users.delete);
        
    // Set up the 'userId' parameter middleware
     app.param('userId', users.userByID);
    
    // Set up the 'username' parameter middleware
    // app.param('username', users.userByUsername);
};