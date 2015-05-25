'use strict';
require('./test.env.es6');

let expect = require('chai').expect;
let db = require('../libs/database.es6');
let phrase = require('../libs/resource/phrase.es6');
let word = require('../libs/resource/word.es6');

describe('Words resource', function () {
    describe('#add', function () {
        it('Should add to db array of words associated with phrase', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    let items = [
                        {content: 'sadasdw'}];

                    return phrase.add(items);
                })
                .then(function () {
                    return db.Phrase.findAll();
                })
                .then(function (items) {
                    var words = [
                        {name: 'sad', info: {value: 'asdasd', secondValue: 'sad'}},
                        {name: 'sa', info: {value: 'asdasd', secondValue: 'sad'}},
                        {name: 'asad', info: {value: 'asdasd', secondValue: 'sad'}}
                    ];
                    return word.add(words, items[0].id);
                })
                .then(function () {
                    return db.Word.findAll();
                })
                .then(function (result) {
                    expect(result.length).to.be.equal(3);
                    done();
                });
        });

        it('Should reject if phraseId is empty', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    let items = [
                        {content: 'sadasdw'}];

                    return phrase.add(items);
                })
                .then(function () {
                    return db.Phrase.findAll();
                })
                .then(function () {
                    var words = [
                        {name: 'sad', info: {value: 'asdasd', secondValue: 'sad'}},
                        {name: 'sa', info: {value: 'asdasd', secondValue: 'sad'}},
                        {name: 'asad', info: {value: 'asdasd', secondValue: 'sad'}}
                    ];
                    return word.add(words);
                })
                .catch(function (err) {
                    expect(err).to.be.ok;
                    done();
                });
        });

        it('Should reject if related Phrase is empty', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    var words = [
                        {name: 'sad', info: {value: 'asdasd', secondValue: 'sad'}},
                        {name: 'sa', info: {value: 'asdasd', secondValue: 'sad'}},
                        {name: 'asad', info: {value: 'asdasd', secondValue: 'sad'}}
                    ];
                    return word.add(words, 13);
                })
                .catch(function (err) {
                    expect(err).to.be.ok;
                    done();
                });
        });
    });
});
