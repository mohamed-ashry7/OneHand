const express = require('express') 
const router = express.Router()
const OfferRequest = require('../../models/OfferRequest')
const Validator  = require('../../validations/offerRequestValidations')




router.get('/' , async(req, res) =>{
    AllOfferRequests = await OfferRequest.find()
    .populate("recieverID").populate("senderID").populate("ItemID")
    res.send({ALL_Requests: AllOfferRequests}) 
})

router.get('/:id' , async(req,res)=>{
    theOfferRequest = await OfferRequest.findById(req.params.id)
    .populate("recieverID").populate("senderID").populate("ItemID")
    res.send({
        the_Offer_Request:theOfferRequest
    })
    
})

router.post('/' , async(req,res)=>{
    const result = Validator.PostOfferRequestValidation(req.body) 
    if (result.error) { 
        res.status(400).send({
            ERR:result.error.details[0].message
        })
    }
    else { 
        const newOfferRequest =await OfferRequest.create(req.body)
        res.status(200).send({
        Offer_Request_Created : newOfferRequest
     })
    }
})

// no need to update the request . 

router.delete('/:id' , async(req,res) =>{
    const result = await OfferRequest.findByIdAndRemove(req.params.id)
    res.send({
        deleted_OfferRequest:result
    })
})
module.exports = router