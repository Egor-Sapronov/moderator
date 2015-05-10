'use strict';

module.exports = (function () {
    let db = require('../database.es6');
    let crypto = require('crypto');

    function generate(userId) {
        return db.ApiKey.create({
            key: crypto.randomBytes(16).toString('hex'),
            UserId: userId
        });
    }

    function getKey(userId) {
        return db.ApiKey
            .find({where: {UserId: userId}});
    }

    function findKey(key) {
        return db.ApiKey
            .find({
                where: {
                    key: key
                }
            });
    }

    return {
        generate: generate,
        getKey: getKey,
        findKey: findKey
    };
})();