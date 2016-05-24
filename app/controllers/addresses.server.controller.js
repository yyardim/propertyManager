/* jshint node: true */
'use strict';

var mongoose = require('mongoose'),
    Address = mongoose.model('Address');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    } else {
        return 'Unknown error';
    }
};



// exports.create = function (req, res) {
//     var address = new Address(req.body);
    
// };