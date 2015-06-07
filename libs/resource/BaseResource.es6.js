'use strict';

function BaseResource(entity) {
    this.entity = entity;
}

BaseResource.prototype.getAll = function () {
    return this.entity.getAll();
};

module.exports = BaseResource;