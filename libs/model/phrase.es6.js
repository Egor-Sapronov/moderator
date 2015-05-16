'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Phrase', {
            content: {
                type: DataTypes.STRING,
                unique: true
            },
            subject: {
                type: DataTypes.STRING
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        });
};