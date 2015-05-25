'use strict';

let router = require('express').Router();
let phrase = require('../libs/resource/phrase.es6');

router.get('/phrases', function (req, res) {
    return phrase.get()
        .then(function (items) {
            var data = JSON.stringify({phrases: items});
            return res.status(200).send(data);
        });
});

router.post('/phrases', function (req, res) {
    return phrase.add(req.body.phrases)
        .then(function () {
            return res.status(201).end();
        });
});

router.post('/execute', function (req, res) {
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

module.exports = router;