const Joi = require('joi')
const schemas = {
    test: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required()
    }),

    app: Joi.object().keys({
        instanceId: Joi.string().required()
    }).unknown(),

    installation: Joi.object().keys({
        instanceId: Joi.string().required()
    }),

    dashboard: Joi.object().keys({
        instance: Joi.string().required()
    }).unknown(),
    // define all the other schemas below
};
module.exports = schemas;
