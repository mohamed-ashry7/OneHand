

const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)


module.exports = {

    PostOfferRequestValidation : OfferRequest =>{

        const scheme = {
            senderID : Joi.objectId().required()  , 
            recieverID : Joi.objectId().required()  , 
            ItemID : Joi.objectId() , 
            operation : Joi.number() , 
            price : Joi.number() , 
            paymentMethod : Joi.number() , 
            state : Joi.number() 
        }
        return  Joi.validate(OfferRequest,scheme) 
    }
}