'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Word', {
            name: {
                type: DataTypes.STRING,
                unique: false
            },
            class: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                unique: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        });
};