const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// We will be connecting using database
const User = require("../../models/User");
var userController = require("../../controllers/userController");

router.get('/',userController.viewAllUsers);

router.get('/:id',userController.viewOneUserByID);

router.post('/',userController.createUser);

router.put('/:id',userController.updateUser);

router.delete('/:id',userController.deleteUser);
