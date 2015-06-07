'use strict';

let router = require('express').Router();
let uow = require('../libs/resource/uow.es6');
let parser = require("odata-parser");
let url = require('url');

router.post('/phrases', function (req, res) {
    return uow.phrases.create(req.body)
        .then(function (phrase) {
            uow.words.bulkCreate(phrase.words.map(function (item) {
                return {
                    name: item,
                    PhraseId: phrase.id
                }
            }))
                .then(function () {
                    res.status(201).send(phrase);
                });
        });
});

router.get('/words', function (req, res) {
    return uow.words.findAll({
        include: [{all: true}],
        order: [['id', 'DESC']]
    })
        .then(function (result) {
            res.send(result);
        });
});

router.put('/phrases/:id', function (req, res) {
    return uow.phrases.findById(req.params.id)
        .then(function (phrase) {
            phrase.submited = req.body.submited;
            return phrase.save();
        })
        .then(function (phrase) {
            res.send(phrase);
        });
});

router.put('/words/:id', function (req, res) {
    return uow.words.findById(req.params.id)
        .then(function (word) {
            word.class = req.body.class;
            return word.save();
        })
        .then(function (word) {
            res.send(word);
        });
});

router.get('/phrases', function (req, res) {
    var options = {
        include: [{all: true}],
        order: [['id', 'DESC']]
    };
    if (req.query.select) {
        options.attributes = req.query.select.replace(' ', '').split(',')
    }

    if (!req.query.all) {
        options.where = {
            submited: false
        }
    }

    return uow.phrases.findAll(options)
        .then(function (result) {
            res.send(result);
        });
});

module.exports = router;