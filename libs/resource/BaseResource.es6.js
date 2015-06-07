'use strict';

function BaseResource(entity) {
    this.entity = entity;
}

BaseResource.prototype.findAll = function (options) {
    return this.entity.findAll(options);
};

BaseResource.prototype.bulkCreate = function (models) {
    return this.entity.bulkCreate(models);
};

BaseResource.prototype.findById = function (id) {
    return this.entity.findOne({where: {id: id}});
};

BaseResource.prototype.findOne = function (options) {
    return this.entity.findOne(options);
};

BaseResource.prototype.create = function (options) {
    return this.entity.create(options);
};

module.exports = BaseResource;