'use strict';

let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let passport = require('./libs/auth/auth.es6').passport;
let session = require('express-session');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');
let bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(session({
    secret: 'secret',
    cookie: true,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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