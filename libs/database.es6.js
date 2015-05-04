'use strict';

/**
 * Main db module
 */

let Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DATABASE_URL, {logging: false});
let db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: sequelize.import('User', require('./model/user.es6')),
    AccessToken: sequelize.import('AccessToken', require('./model/accessToken.es6'))
};

db.AccessToken.belongsTo(db.User);

module.exports = db;