'use strict';

module.exports = (function () {
    let db = require('../database.es6');
    let crypto = require('crypto');

    function generate(userId) {
        return db.ApiKey.create({
            key: crypto.randomBytes(32).toString('hex'),
            UserId: userId
        });
    }

    return {
        generate: generate
    };
})();