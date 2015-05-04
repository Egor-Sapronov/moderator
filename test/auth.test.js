'use strict';
process.env.DATABASE_URL = "postgres://localhost:5432/test";

let expect = require('chai').expect;

describe('Auth service', function () {
    let service = require('../libs/auth/authService.es6');
    let db = require('../libs/database.es6');

    it('Should exist', function () {
        expect(service).to.be.ok;
    });

    describe('#saveToken', function () {
        it('Should save token for the user', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.saveToken(user, 'token');
                })
                .then(function (token) {
                    expect(token).to.be.ok;
                    done();
                });
        });
    });

    describe('#getToken', function () {
        it('Should return token', function (done) {
            let user;
            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (entity) {
                    user = entity;
                    return service.saveToken(user, 'token');
                })
                .then(function (token) {
                    return service.getToken(user);
                })
                .then(function (token) {
                    expect(token).to.be.ok;
                    done();
                });
        });
    });
});

describe('Auth strategy, facebook and bearer', function () {
    var strategy = require('../libs/auth/strategy.es6');

    it('Should exist', function () {
        expect(strategy).to.be.ok;
    });

    describe('#googleStartegy', function () {
        it('Should save user and access token in db', function (done) {
            var db = require('../libs/database.es6');
            db.sequelize.sync({force: true})
                .then(function () {
                    var profile = {
                        id: '1',
                        provider: 'facebook',
                        profileUrl: 'https://link.com',
                        displayName: 'egor sapronov',
                        gender: 'male',
                        _json: {
                            name: 'egor',
                            email: 'sapronov egor'
                        }
                    };
                    var accessToken = 'token';
                    var refreshToken = 'refreshtoken';
                    var request = {};

                    strategy.googleStartegy(request, accessToken, refreshToken, profile, function (err, user) {
                        expect(user).to.be.ok;
                        expect(user.providerId).to.equal(profile.id);
                        done();
                    });
                });
        });

        it('Should update user access token if user already exist', function (done) {
            var db = require('../libs/database.es6');
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (entity) {
                    var profile = {
                        id: '1',
                        provider: 'facebook',
                        profileUrl: 'https://link.com',
                        displayName: 'egor sapronov',
                        gender: 'male',
                        _json: {
                            name: 'egor',
                            email: 'sapronov egor'
                        }
                    };
                    var accessToken = 'token';
                    var refreshToken = 'refreshtoken';
                    var request = {};

                    strategy.googleStartegy(request, accessToken, refreshToken, profile, function (err, user) {
                        expect(user).to.be.ok;
                        expect(user.providerId).to.equal(profile.id);
                        done();
                    });
                });
        });
    });

    describe('#bearerStrategy', function () {
        it('Should return user by related access token', function (done) {
            var db = require('../libs/database.es6');
            var user;
            var token;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (entity) {
                    user = entity;
                    return db.AccessToken.create({
                        token: 'token',
                        UserId: user.id
                    });
                })
                .then(function (entity) {
                    token = entity;
                    strategy.bearerStrategy(token.token, function (err, user) {
                        expect(user).to.be.ok;
                        expect(user.providerId).to.be.ok;
                        done();
                    });
                });
        });

        it('Should not return user if token is not exist', function (done) {
            var db = require('../libs/database.es6');
            db.sequelize.sync({force: true})
                .then(function () {
                    strategy.bearerStrategy('badtoken', function (err, user) {
                        expect(user).to.be.not.ok;
                        done();
                    });
                });
        });
    });
});