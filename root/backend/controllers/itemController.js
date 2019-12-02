const express = require("express");
const router = express.Router();

const validator = require('../validations/itemValidations')
const Item = require("../models/Item");

exports.getAllItems = async (req, res) => {
    try{
        const items = await Item.find().populate("sellerID").populate("payerID");
        if(requests.length===0)
            res.json({msg : "empty"});
        else
            res.json({ data: items });
    }
    catch(error)
    {
        console.log(error);
    }
};

exports.getItemByID = async (req, res) => {  
    try{
        const itemID = req.params.id;
        const item = await Item.findById(itemID).populate("sellerID").populate("payerID");
        if(!item) { return res.status(404).send({error: "Item does not exist"});}     
        return res.json({item});
    }
    catch(error)
    {
      console.log(error);
    }
  }


  exports.updateItem = async  (req, res) => {
    try{
        const itemID = req.params.id;
        const item =  await Item.findById(itemID);
        if(!item) return res.status(404).send({error: "Item does not exist"});
        const isValidated = validator.requestUpdateValidation(req.body);
        if (isValidated.error) return   res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedItem = await Request.updateOne({'_id':itemID},req.body);
        res.json({msg: 'Item updated successfully' , data: item });
    }
    catch(error)
    {
      console.log(error);
    }
  }

  exports.deleteItem =  async (req, res) => {
    try{ 
        const itemID = req.params.id;
        const deletedItem = await Request.findByIdAndRemove(itemID);
        if(!deletedItem) return res.status(404).send({error: 'Item does not exist' });
        res.json({msg:'Item was deleted successfully', data: deletedItem });
    }
    catch(error){
      console.log(error);
    }
  }