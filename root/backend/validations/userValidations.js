const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            firstName: Joi.string().required(),
            lastName:Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).alphanum().required(),
            phone: Joi.number().required(),
            address:Joi.string().required()  
        }

        return Joi.validate(request, createSchema)
    },
    updateValidation: request => {
        const updateSchema = {
            firstName: Joi.string(),
            lastName:Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().min(8).alphanum(),
            phone: Joi.number(),
            address:Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }
}