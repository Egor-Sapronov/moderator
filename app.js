'use strict';

let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let keyFactory = require('./libs/api/keyFactory.es6');
let passport = require('./libs/auth/auth.es6').passport;
let authService = require('./libs/auth/authService.es6');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');
let phraseService = require('./libs/api/keyFactory.es6');

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

app.post('/api/phrases',
    function (req, res) {
        phraseService.addPhrase(req.body.phrase)
            .then(function (result) {
                res.status(201).send(result);
            })
            .catch(function (err) {
                res.status.send(err);
            });
    });

app.get('/api/phrases',
    function (req, res) {
        phraseService.getAll()
            .then(function (items) {
                res.send(items);
            })
            .catch(function (err) {
                res.status.send(err);
            })
    });

app.post('/api/execute', function (req, res) {
    if (!req.body) {
        return res.status(400).send('No body');
    }

    if (!req.body.content) {
        return res.status(400).send('No content');
    }

    if (!req.body.key) {
        return res.status(400).send('No API key');
    }

    return keyFactory.findKey(req.body.key)
        .then(function (key) {
            if (!key) {
                res.status(400).send('Invalid API key');
            }

            res.status(200).send({result: 'Success'});
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

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = app;