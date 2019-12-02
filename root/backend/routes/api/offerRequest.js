const express = require('express') 
const router = express.Router()
const Notification = require('../../models/OfferRequest')
const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)



router.get('/' , async(req, res) =>{
    
})