'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Word', {
            name: {
                type: DataTypes.STRING,
                unique: false
            },
            class: {
                type: DataTypes.JSON,
                unique: false
            },
            info: {
                type: DataTypes.JSON,
                unique: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        });
};