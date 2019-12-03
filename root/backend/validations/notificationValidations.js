const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)


module.exports = {

    PostNotificationValidation : Notification =>{

        const scheme = {
            senderID :Joi.objectId().required() , 
            recieverID : Joi.objectId().required() , 
            content : Joi.string().required , 
            date : Joi.date() , 
            isRead : Joi.required() 
        }
        return  Joi.validate(Notification,scheme) 
    }
}