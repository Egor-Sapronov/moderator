'use strict';

let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let passport = require('./libs/auth/auth.es6').passport;
let authService = require('./libs/auth/authService.es6');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');

app.use('/static', express.static('./web/dist'));
app.set('view engine', 'jade');
app.set('views', './web/src/templates');
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(session({
    secret: 'secret',
    cookie: true,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/home', ensureAuthenticated, function (req, res) {
    res.render('index', {user: req.user.name});
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    }));

app.get('/oauth2callback',
    passport.authenticate('google'),
    function (req, res) {
        authService.getToken(req.user)
            .then(function (token) {
                res.redirect('/home#' + token.token);
            });
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/home');
}

module.exports = app;