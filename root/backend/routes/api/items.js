const express = require('express');
const router = express.Router();

const Item =require('../../models/Item');
const validator =require('../../validations/itemValidations');
const itemFunctions = require('../../controllers/itemController')

// Get all items
router.get("/",itemFunctions.getAllItems);


// Get a certain item
router.get('/:id', itemFunctions.getItemByID);

// Update a item info
router.put("/:id",itemFunctions.updateItem);

// Delete a item
router.delete("/:id",itemFunctions.deleteItem);

// Create a admin
router.post('/',itemFunctions.createItem);

module.exports = router