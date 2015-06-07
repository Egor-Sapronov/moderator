'use strict';

module.exports = (function () {
    let db = require('../database.es6');
    let BaseResource = require('./BaseResource.es6');
    return {
        users: new BaseResource(db.User),
        phrases: new BaseResource(db.Phrase),
        words: new BaseResource(db.Word)
    }
})();