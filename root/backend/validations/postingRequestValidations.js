

const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)


module.exports = {
    
    PostPostingRequestValidation : PostingRequest =>{

        const scheme = {
            senderID : Joi.objectId().required()  , 
            ItemID : Joi.objectId() , 
            operation : Joi.Integer() , 
            price : Joi.Integer() , 
            paymentMethod : Joi.Integer() , 
            state : Joi.Integer() 
        }
        return  Joi.validate(PostingRequest,scheme) 
    } , 
    UpdatePostingRequestValidation : PostingRequest =>{

        const scheme = {
            senderID : Joi.objectId() , 
            ItemID : Joi.objectId() , 
            operation : Joi.Integer() , 
            price : Joi.Integer() , 
            paymentMethod : Joi.Integer() , 
            state : Joi.Integer() 
        }
        return  Joi.validate(PostingRequest,scheme) 
    }
}