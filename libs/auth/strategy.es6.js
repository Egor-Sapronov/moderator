'use strict';

let db = require('../database.es6');
let authService = require('./authService.es6');
let keyFactory = require('../resource/key.es6.js');

/**
 * Exchange user for access token
 * @param {string} accessToken
 * @param {function}
 */
function bearerStrategy(accessToken, done) {
    db.AccessToken
        .find({where: {token: accessToken}})
        .then(function (token) {
            if (token === null) {
                return done(null, false);
            }
            db.User
                .find({where: {id: token.UserId}})
                .then(function (user) {
                    done(null, user);
                });
        });
}

function googleStartegy(accessToken, tokenSecret, profile, done) {
    db.User
        .findOrCreate({
            where: {providerId: profile.id},
            defaults: {
                providerId: profile.id,
                provider: profile.provider,
                profileLink: profile.profileUrl,
                displayName: profile.displayName,
                name: profile._json.displayName,
                email: profile._json.email,
                gender: profile.gender
            }
        })
        .spread(function (user, created) {
            authService
                .saveToken(user, accessToken)
                .then(function () {
                    if (created) {
                        return keyFactory.generate(user.id);
                    }

                    return Promise.resolve();
                })
                .then(function () {
                    return done(null, user);
                });
        });
}

module.exports = {
    bearerStrategy: bearerStrategy,
    googleStartegy: googleStartegy
};