// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'User' Mongoose model
var User = require('mongoose').model('User'),
    passport = require('passport');

// Create a new 'private' error handling controller method
var getErrorMessage = function(err) {
    var message = '';
    
    // If an internal MongoDB error occurs, get the error message
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;  
            // If a general error occurs, set the message error 
            default:
                message = 'Something went wrong';
                break;
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    
    // Return the error message
    return message;
};

// Create a new controller method that renders the signin page
exports.renderSignin = function(req, res, next) {
    // If user is not connected, render the signin page, otherwise, redirect the user back to the main app page
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that renders the signup page
exports.renderSignup = function(req, res, next) {
    // If user is not connected, render the signup page, otherwise, redirect the user back to the main app page
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that creates new 'regular' users
exports.signup = function(req, res, next) {
    // If user is not connected, create and login a new user, otherwise, redirect to main
    if (!req.user) {
        // Create a new 'User' model instance
        var user = new User(req.body);
        var message = null;
        
        // Set the user provider property
        user.provider = 'local';
        
        // Try saving the new user document
        user.save(function(err) {
            // If an error occurs, use flash messages to report the error
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                
                return res.redirect('/signup');
            }
            
            // If the user was created successfully, use the Passport 'login' method to login
            req.login(user, function(err) {
                // If a login error occurs, move to the next middleware
                if (err) {
                    return next(err);
                }
                
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that creates new 'OAuth' users
exports.saveOAuthUserProfile = function(req, profile, done) {
    // Try finding a user document that was registered using the current OAuth provider
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user) {
        if (err) {
            return done(err);
        } else {
            // If a user could not be found, create a new user, otherwise, continue to next middleware
            if (!user) {
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                
                User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                    // Set the available username
                    profile.username = availableUsername;
                    
                    // Create the user
                    user = new User(profile);
                    
                    // Try saving the new user document
                    user.save(function(err) {
                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};

// Create a new controller method for signing out
exports.signout = function(req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();
    
    res.redirect('/');
};

// Create a new 'create' controller method
exports.create = function(req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    var user = new User(req.body);
    
    user.save(function(err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(user);
        }
    });
};

// Create a new 'list' controller method
exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

// Create a new 'read' controller method
exports.read = function(req, res, next) {
    // Use the 'response' object to send a JSON response
    res.json(req.user);
};

// Create a new 'update' controller method
exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(user);
        }
    });
};

// Create a new 'delete' controller method
exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
};

// Create custom static method 'findOneByUsername' call controller method
exports.userByUsername = function (req, res, next, username) {
    User.findOneByUsername(username, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

// Create a new 'userById' controller method
 exports.userByID = function(req, res, next, id) {
     // Use the 'User' static 'findOne' method to retrieve a specific user
     User.findOne({
         _id: id
     }, function(err, user) {
         if (err) {
             // Call the next middleware with an error message
             return next(err);
         } else {
             // Set the 'req.user' property
             req.user = user;
             next();
         }
     });
 };

