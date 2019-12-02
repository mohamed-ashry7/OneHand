const express = require('express');
const router = express.Router();

const itemFunctions = require('../../controllers/itemController')

// Get all items
router.get("/",itemFunctions.getAllItems);

// Get a certain item
router.get('/:id', itemFunctions.getItemByID);

// Create a admin
router.post('/',itemFunctions.createItem);

// Update a item info
router.put("/:id",itemFunctions.updateItem);

// Delete a item
router.delete("/:id",itemFunctions.deleteItem);

module.exports = router