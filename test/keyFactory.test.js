'use strict';
require('./test.env.es6');

let expect = require('chai').expect;

describe('Key factory', function () {
    describe('#generate', function () {
        it('Should generate unique api key for user', function (done) {
            let factory = require('../libs/api/keyFactory.es6');
            let db = require('../libs/database.es6');

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
});
