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
        scope: ['https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

app.get('/oauth2callback',
    passport.authenticate('google'),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/api/check', function (req, res) {
    res.send('check');
});


app.post('/api/check', function (req, res) {
    res.send(req.body);
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port ');
});
