

const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)


module.exports = {

    PostOfferRequestValidation : OfferRequest =>{

        const scheme = {
            senderID : Joi.objectId().required()  , 
            recieverID : Joi.objectId().required()  , 
            ItemID : Joi.objectId() , 
            operation : Joi.Integer() , 
            price : Joi.Integer() , 
            paymentMethod : Joi.Integer() , 
            state : Joi.Integer() 
        }
        return  Joi.validate(OfferRequest,scheme) 
    }
}