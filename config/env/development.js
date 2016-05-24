/* jshint node: true */
'use strict';

// Set the 'development' environment configuration object
module.exports = {
    db: 'mongodb://localhost/property-manager',
    sessionSecret: 'developmentPrprtyMngrSessionSecret',
    googleMapApiKey: 'AIzaSyAaLa25Q3GFvMT872-JXVCSZBBUk_v4S-M',
    facebook: {
        clientID: '233647697012139',
        clientSecret: '552c7a5650a87ea24fa5c7bf52d1a469',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    }
};