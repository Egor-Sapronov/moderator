'use strict';
require('./test.env.es6');

let expect = require('chai').expect;
let factory = require('../libs/resource/keyFactory.es6');
let db = require('../libs/database.es6');

describe('Key factory', function () {
    describe('#generate', function () {
        it('Should generate unique api key for user', function (done) {
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
                    factory.generate(user.id)
                        .then(function (key) {
                            expect(key.key).to.be.ok;
                            return factory.generate()
                                .then(function (nextKey) {
                                    expect(key.key).to.not.equal(nextKey.key);
                                    done();
                                });
                        });
                });
        });
    });

    describe('#getKey', function () {
        it('Should return key for the user', function (done) {
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
                    return factory.generate(user.id)
                        .then(function (key) {
                            return factory.getKey(user.id)
                                .then(function (resultKey) {
                                    expect(key.key).to.be.equal(resultKey.key);
                                    done();
                                });
                        });
                });
        });
    });

    describe('#findKey', function () {
        it('Should find key', function (done) {
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
                    return factory.generate(user.id)
                        .then(function (key) {
                            return factory.findKey(key.key)
                                .then(function (resultKey) {
                                    expect(key.key).to.be.equal(resultKey.key);
                                    done();
                                })
                        });
                });
        });

        it('Should return null if key not found', function (done) {
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
                    return factory.generate(user.id)
                        .then(function (key) {
                            return factory.findKey('asfasf')
                                .then(function (resultKey) {
                                    expect(resultKey).to.be.equal(null);
                                    done();
                                })
                        });
                });
        });
    });
});
