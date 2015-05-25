'use strict';

let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let keyFactory = require('./libs/resource/key.es6.js');
let passport = require('./libs/auth/auth.es6').passport;
let authService = require('./libs/auth/authService.es6');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');
let apiRouter = require('./router/api.es6');

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

app.use('/api', apiRouter);

app.get('/',
    function (req, res) {
        res.render('index');
    });

app.get('/direct',
    function (req, res) {
        res.render('direct');
    });

app.get('/learning',
    function (req, res) {
        res.render('learning');
    });

app.get('/home',
    ensureAuthenticated,
    function (req, res) {
        return keyFactory.getKey(req.user.id)
            .then(function (key) {
                res.render('home', {
                    user: req.user.name,
                    key: key.key
                });

            });
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

app.use(function (req, res, next) {
    res.status(404);

    //if (req.accepts('html')) {
    //    res.render('404', {url: req.url});
    //    return;
    //}

    if (req.accepts('json')) {
        res.send({error: 'Not found'});
        return;
    }

    res.type('txt').send('Not found');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).end('Server error');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = app;