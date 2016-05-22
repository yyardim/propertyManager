'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var PropertySchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Property name cannot be blank'
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Property', PropertySchema);