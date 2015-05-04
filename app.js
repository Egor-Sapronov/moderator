'use strict';

let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let passport = require('./libs/auth/auth.es6').passport;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

app.get('/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

module.exports = app;