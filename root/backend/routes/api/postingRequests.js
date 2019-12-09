

const express = require('express')
const router = express.Router() 
const PostingRequest = require('../../models/PostingRequest')
const Validator = require('../../validations/postingRequestValidations')



// get the Only available offerRequests . 

router.get('/' , async(req,res)=>{
    const allPostingRequest = await PostingRequest.find({
        state : {$gte:1}
    })
    res.send({
        theAvailableRequests :allPostingRequest
    })
    
}) ; 

router.get('/:id' ,async(req,res) =>{
    const specificPostingRequest = await PostingRequest.findById(req.params.id)
    res.send({
        the_specific_posting_Request :specificPostingRequest
    })
}) ;

router.post('/' , async(req,res)=>{
    const result = Validator.PostPostingRequestValidation(req.body)
    if (result.error) {
        res.status(400).send({
            ERR:result.error.details[0].message
        })
    }
    else {
    const newPostingRequest =await PostingRequest.create(req.body)
    res.status(200).send({
        PostingRequest_Created : newPostingRequest
     })
    }
})

router.put('/:id' , async(req,res) => { 
    const ID = req.params.id 
    const isExisted = await PostingRequest.findById(ID)
    if (!isExisted) {
        return res.status(404).send({error: "Posting Request does not exist"})
    }
    const result = Validator.UpdatePostingRequestValidation(req.body)
    if (result.error) {
        res.status(400).send({
            ERR:result.error.details[0].message
        })
    }
    else {
    const updatedPostingRequest =await PostingRequest.updateOne({_id:ID} , req.body)
    res.status(200).send({
        PostingRequest_Updated : updatedPostingRequest
     })
    }
})

router.delete('/:id' , (req,res) =>{
    const result = await PostingRequest.findByIdAndRemove(req.params.id)
    res.send({
        deleted_OfferRequest:result
    })
})