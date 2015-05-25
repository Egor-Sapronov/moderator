'use strict';

module.exports = (function () {
    let db = require('../database.es6');

    function add(phrases) {
        if (phrases.length === 0) {
            return Promise.reject('Empty phrases array');
        }
        return db.Phrase.bulkCreate(phrases);
    }

    function get() {
        return db.Phrase.findAll();
    }

    return {
        get: get,
        add: add
    };
})();