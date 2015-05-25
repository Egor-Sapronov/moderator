'use strict';
require('./test.env.es6');

let expect = require('chai').expect;
let db = require('../libs/database.es6');
let phrase = require('../libs/resource/phrase.es6');

describe('Phrase resource', function () {
    describe('#add', function () {
        it('Should add to db array of phrases', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    let items = [
                        {content: 'sadasdw'},
                        {content: 'sadasdwq'},
                        {content: 'sadasdqwe'},
                        {content: 'sadasdqweqwe'},
                        {content: 'sadasdqwew'}];

                    return phrase.add(items);
                })
                .then(function () {
                    return db.Phrase.findAll();
                })
                .then(function (items) {
                    expect(items.length).to.be.equal(5);
                    done();
                });
        });

        it('Should reject if phrases is empty', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    let items = [];

                    return phrase.add(items);
                })
                .catch(function (err) {
                    expect(err).to.be.ok;
                    done();
                });
        });
    });
});
