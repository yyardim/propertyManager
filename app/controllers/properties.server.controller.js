/* jshint node: true */
'use strict';

var mongoose = require('mongoose'),
    Property = mongoose.model('Property'),
    Address = mongoose.model('Address');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    var property = new Property(req.body);
    var address = new Address(req.body.address);
    
    property.creator = req.user;
    property.address = address;
    
    property.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(property);
        }
    });
};

exports.list = function (req, res) {
    Property
        .find({})
        .sort('-created')
        .populate('creator', 'firstName lastName fullName')
        .populate('address', 'line1 line2 city zip')
        .exec(function (err, properties) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(properties);
            }
    });
};

exports.propertyById = function (req, res, next, id) {
    Property.findById(id)
        .populate('creator', 'firstName lastName fullName')
        .exec(function (err, property) {
            if (err) {
                return next(err);
            }
            if (!property) {
                return next(new Error('Failed to load property ' + id));
            }
            req.property = property;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.property);
};

exports.update = function(req, res) {
    var property = req.property;
    var address = req.body.address;
    
    property.name = req.body.name;
    property.address = address;
    
    property.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(property);
        }
    });
};

exports.delete = function (req, res) {
    var property = req.property;
    
    property.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(property);
        }
    });
};

exports.hasAuthorization = function (req, res, next) {
    if (req.property.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};