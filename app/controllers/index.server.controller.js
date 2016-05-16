// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
exports.render = function(req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' and 'userFullname' properties    
    res.render('index', {
        title: 'Property Manager',
        userFullName: req.user ? req.user.fullName : ''
    });
};