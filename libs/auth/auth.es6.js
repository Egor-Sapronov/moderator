'use strict';

let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;
let strategy = require('./strategy.es6');
let GoogleStrategy = require('passport-google-oauth2').Strategy;
let db = require('../database.es6');


passport.use(new BearerStrategy(strategy.bearerStrategy));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://moderator-develop.herokuapp.com/oauth2callback",
        passReqToCallback: true
    },
    strategy.googleStartegy
));

module.exports.passport = passport;