


const express = require('express') 
const router = express.Router()
const Notification = require('../../models/Notification')
const Validator = require('../../validations/notificationValidations')
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
   
    const result = Validator.PostNotificationValidation(req.body)
    if (result.error) {
        res.status(400).send({
            ERR:result.error.details[0].message
        })
    }
    else {
    const newNotification =await Notification.create(req.body)
    res.status(200).send({
        Notification_Created : newNotification
     })
    }
})

router.delete('/:id' , async(req,res)=>{
   const deletedNotfication =  await Notification.findByIdAndRemove(req.params.id)
    res.send({
        deleted_Notfication:deletedNotfication
    })
})


module.exports = router