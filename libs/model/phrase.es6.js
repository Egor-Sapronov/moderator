'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Phrase', {
            content: {
                type: DataTypes.STRING,
                unique: false
            },
            words: {
                type: DataTypes.VIRTUAL,
                get: function () {
                    return this.content.split(' ');
                }
            },
            submited: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        });
};