const express = require("express");

const Joi = require('joi')
const validator = require('../validations/itemValidations')
const Item = require("../models/Item");
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']


exports.getItemsInRange = async (req, res) => {
    const schema = {
        type: Joi.required(),
        limit: Joi.required(),
        offset: Joi.required()
    };

    const result = Joi.validate(req.params, schema);

    if (result.error)
        return res.status(400).send({ error: result.error.details[0].message });
    const type = req.params.type;
    const limit = parseInt(req.params.limit, 10);
    const offset = parseInt(req.params.offset, 10);
    const items = await Item.find({ type: type }).populate("sellerID").populate("buyerID")
        .skip(offset)
        .limit(limit);
    res.json({ data: items });
}
exports.getAllItems = async (req, res) => {
    try{
        const items = await Item.find().populate("sellerID").populate("buyerID");
        if(items.length===0)
            res.json({msg : "empty"});
        else
            res.json({ data: items });
    }
    catch(error)
    {
        res.json({error:error.message});
        
    }
};

exports.getItemByID = async (req, res) => {  
    try{
        const itemID = req.params.id;
        const item = await Item.findById(itemID).populate("sellerID").populate("buyerID");
        if(!item) { return res.status(404).send({error: "Item does not exist"});}     
        return res.json({item});
    }
    catch(error)
    {
        res.json({error:error.message});
    }
};


exports.createItem = async (req, res) => {
    console.log("ddddddddddddddddddddddddddddddddddddddddddd");
    try{
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        console.log("ddddddddddddddddddddddddddddddddddddddddddd");
        const item = new Item({
            type:req.body.type,
            title:req.body.title,
            price:req.body.price,
            category:req.body.category,
            state:req.body.state,
            description:req.body.description,
            address:req.body.address,
            sellerID :req.body.sellerID,
            buyerID :req.body.buyerID
        })
        saveImage(item, req.body.image)
        console.log("dddddddddddddddddfxxxfffddddddddddddddddddddddd");
        //console.log(item)
        await item.save()
        res.json({msg:'Item was created successfully', data: newItem});
    }
    catch(error) {
        res.json({error:error.message});
    } 
};

function saveImage(item, image) {
    if (image == null) return
    if (image != null && imageMimeTypes.includes(image.type)) {
        item.Image = new Buffer.from(image.data, 'base64')
        item.ImageType = image.type
    }
}

  exports.updateItem = async  (req, res) => {
    try{
        const itemID = req.params.id;
        const item =  await Item.findById(itemID);
        if(!item) return res.status(404).send({error: "Item does not exist"});
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedItem = await Item.updateOne({'_id':itemID},req.body);
        res.json({msg: 'Item updated successfully' , data: updatedItem });
    }
    catch(error)
    {
        res.json({error:error.message});
    }
  }

  exports.deleteItem =  async (req, res) => {
    try{ 
        const itemID = req.params.id;
        const deletedItem = await Item.findByIdAndRemove(itemID);
        if(!deletedItem) return res.status(404).send({error: 'Item does not exist' });
        res.json({msg:'Item was deleted successfully', data: deletedItem });
    }
    catch(error){
        res.json({error:error.message});
    }
  }