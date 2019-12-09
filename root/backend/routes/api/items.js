const express = require('express');
const router = express.Router();
const auth = require('./middleware/check-auth');
const itemFunctions = require('../../controllers/itemController')


const validator = require('../../validations/itemValidations');
const Item = require("../../models/Item");

// Get all items
router.get("/",auth,async (req, res) => {
    try{
        const items = await Item.find().populate("sellerID").populate("buyerID");
        if(items.length===0)
            res.json({msg : "empty"});
        else
            res.json({ data: items });
            //console.log(items);
    }
    catch(error)
    {
        res.json({error:error.message});
        
    }
});

// Get a certain item
router.get('/:id',auth, async (req, res) => {  
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
});


router.post('/',auth,async (req, res) => {
    try{
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const newItem =await Item.create(req.body);
        res.json({msg:'Item was created successfully', data: newItem});
        console.log(req.body)
    }
    catch(error) {
        res.json({error:error.message});
    } 
});

// Update a item info
router.put("/:id",auth,async  (req, res) => {
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
  });

// Delete a item
router.delete("/:id", auth,async (req, res) => {
    try{ 
        const itemID = req.params.id;
        const deletedItem = await Item.findByIdAndRemove(itemID);
        if(!deletedItem) return res.status(404).send({error: 'Item does not exist' });
        res.json({msg:'Item was deleted successfully', data: deletedItem });
    }
    catch(error){
        res.json({error:error.message});
    }
  });

module.exports = router