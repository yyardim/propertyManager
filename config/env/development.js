// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
    db: 'mongodb://localhost/property-manager',
    sessionSecret: 'developmentPrptyMngrSessionSecret',
    facebook: {
        clientID: '233647697012139',
        clientSecret: '552c7a5650a87ea24fa5c7bf52d1a469',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    }
};