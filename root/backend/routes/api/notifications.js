

const Joi = require('joi')

const express = require('express') 
const router = express.Router()
const Notification = require('../../models/Notification')
const Validator = require('../../validations/notificationValidations')
const auth = require('../api/middleware/check-auth')
// getting all the notifications 



router.get("/:limit/:offset",auth, async (req, res) => {
    const recieverID = req.body.recieverID;
    const schema = {
      limit: Joi.required(),
      offset: Joi.required()
    };
    const result = Joi.validate(req.params, schema);
    if (result.error)
      return res.status(400).send({ error: result.error.details[0].message });
    const limit = parseInt(req.params.limit, 10);
    const offset = parseInt(req.params.offset, 10); // if some thing wrong happend remove the populate 
    // const notifications = await Notification.find({ recieverId: recieverId }).populate("recieverId")
    const notifications = await Notification.find({ recieverID: recieverID }).sort({isRead:1,date: -1}).populate("recieverID")
    .populate("recieverID")
      .skip(offset)
      .limit(limit);
    res.json({ data: notifications });
  });

router.get("/" ,auth, async(req , res )=>{
    const notifications =await Notification.find()
    .populate("recieverID")
    res.json({current_notifications:notifications})
}) ; 


router.get("/:id",auth , async(req,res)=>{
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

router.delete('/:id',auth , async(req,res)=>{
   const deletedNotfication =  await Notification.findByIdAndRemove(req.params.id)
    res.send({
        deleted_Notfication:deletedNotfication
    })
})


module.exports = router