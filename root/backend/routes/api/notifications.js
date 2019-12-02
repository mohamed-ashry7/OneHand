


const express = require('express') 
const router = express.Router()
const Notification = require('../../models/Notification')
const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)
// getting all the notifications 

router.get("/" , async(req , res )=>{
    const notifications =await Notification.find()
    .populate("recieverID")
    res.json({current_notifications:notifications})
}) ; 


router.get("/:id" , async(req,res)=>{
    const notification = await Notification.findById(req.params.id)
    .populate("recieverID")
    res.json({specific_notification:notification})
}) ; 


// Create new Notification 
router.post("/" , async(req,res)=>{
    const scheme = {
        senderID :Joi.objectId().required() , 
        recieverID : Joi.objectId().required() , 
        content : Joi.string().required , 
        date : Joi.date() , 
        isRead : Joi.required() 
    }
    const result = Joi.validate(req.body, scheme)
    if (result.error) {
        res.status(400).send({
            ERR:result.error.details[0].message
        })
    }
    const newNotification =await Notification.create(req.body)
    res.status(200).send({
        Notification_Created : newNotification
    })
})

router.delete('/:id' , async(req,res)=>{
   const deletedNotfication =  await Notification.findByIdAndDelete({
        _id:req.params.id 
    })
    res.send({
        deleted_Notfication:deletedNotfication
    })
})


