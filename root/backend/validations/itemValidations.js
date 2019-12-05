const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    createValidation: item => {
        const createSchema = {
            type:Joi.string().required(),
            title:Joi.string().required(),
            price:Joi.number(),
            category:Joi.string(),
            state:Joi.boolean().required(),
            description:Joi.string(),
            address:Joi.string().required(),
            sellerID :Joi.objectId(),
            payerID:Joi.objectId()
        }

        return Joi.validate(item, createSchema)
    },
    updateValidation: item => {
        const updateSchema = {
            title:Joi.string(),
            price:Joi.number(),
            category:Joi.string(),
            state:Joi.boolean(),
            description:Joi.string(),
            address:Joi.string(),
            sellerID :Joi.objectId(),
            payerID:Joi.objectId()
        }

        return Joi.validate(item, updateSchema)
    }
}
