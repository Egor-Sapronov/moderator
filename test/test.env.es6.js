'use strict';
module.exports = (function () {
    let path = require('path');
    let env = require('node-env-file');
    env(path.resolve('.env'));
})();