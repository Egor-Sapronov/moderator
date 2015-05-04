'use strict';

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var passport = require('./libs/auth/auth.es6').passport;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

app.get('/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

app.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port ');
});
