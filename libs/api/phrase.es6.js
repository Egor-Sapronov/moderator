'use strict';

module.exports = (function () {
    let db = require('../database.es6');

    function addPhrase(phrase) {
        return db.Phrase.create({
            content: phrase.content,
            subject: phrase.subject
        });
    }

    function getAll() {
        return db.Phrase.findAll();
    }

    return {
        addPhrase: addPhrase,
        getAll: getAll
    };
})();