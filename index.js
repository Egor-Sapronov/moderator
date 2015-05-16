'use strict';

let app = require('./app');
let db = require('./libs/database.es6');

db.sequelize
    .then(function () {
        app.listen(process.env.PORT || 3000, function () {
            console.log('Express server listening on port ' + process.env.PORT);
        });
    });