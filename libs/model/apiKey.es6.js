'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ApiKey', {
        key: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};