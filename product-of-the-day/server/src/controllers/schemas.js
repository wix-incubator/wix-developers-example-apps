const Joi = require('joi')
const schemas = {
    test: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required()
    }),

    dashboard: Joi.object().keys({
        instance: Joi.string().required()
    }).unknown(),

    productOfTheDay: Joi.object().keys({
        productId: Joi.string().required(),
        instance: Joi.string().required(),
        discountPercentage: Joi.number().min(1).max(99).required()
    }),

    searchProduct: Joi.object().keys({
        instance: Joi.string().required(),
        term: Joi.string().min(2).required()
    })
    // define all the other schemas below
};
module.exports = schemas;
