'use strict';

module.exports = (function () {
    let db = require('../database.es6');

    function add(words, phraseId) {
        if (words.length === 0) {
            return Promise.reject('Empty words array');
        }

        if (!phraseId) {
            return Promise.reject('Undefined phraseId');
        }

        return db.Phrase.find(phraseId)
            .then(function (phrase) {
                if (phrase !== null) {
                    let associatedWords = words.map(function (item) {
                        item.PhraseId = phraseId;

                        return item;
                    });

                    return db.Word.bulkCreate(associatedWords);
                } else {
                    return Promise.reject('Related phrase in undefined');
                }
            });
    }

    function get() {
        return db.Word.findAll();
    }

    return {
        get: get,
        add: add
    };
})();