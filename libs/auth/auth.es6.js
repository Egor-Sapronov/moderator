'use strict';

let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;
let strategy = require('./strategy.es6');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let db = require('../database.es6');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    db.User.find({
        where: {
            id: id
        }
    })
        .then(function (user) {
            done(null, user);
        });
});

passport.use(new BearerStrategy(strategy.bearerStrategy));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://moderator-develop.herokuapp.com/oauth2callback"
    },
    strategy.googleStartegy
));

module.exports.passport = passport;