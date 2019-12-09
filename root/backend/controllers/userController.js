const User = require("../models/User");
const validator = require("../validations/userValidations");
const Joi = require("joi");
var ObjectId = require("mongoose").Types.ObjectId;
const bcrypt =require('bcrypt-nodejs');

exports.viewAllUsers = async (req, res) => {
    const users = await User.find()
    res.json({ data: users });
  };


exports.viewOneUserByID = async (req, res) => {
    try {
      const userID = req.params.id;
      const user = await Task.findOne({ _id: userID })
      if (!user) return res.status(400).send({ error: "User does not exist" });
      return res.json({ user });
    } catch (error) {
      console.log(error);
    }
};



exports.createUser = async(req,res) =>{
    try{
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const salt =bcrypt.genSaltSync(10);
        const passAfterHashing =bcrypt.hashSync(req.body.password,salt);
        const newUser =await User.create({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password: passAfterHashing,
            phone:req.body.phone,
            address:req.body.address
        });
        res.json({msg:'User was created successfully', data: newUser});
   }
   catch(error) {
        res.json({error:error.message});
   } 

};



exports.updateUser = async(req,res)=>{
    try {
        const id = req.params.id;
        const user = await User.findOne({_id:id});
        // bad request
        if(!user) res.status(400).send({error:'User was not found'});
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const firstName =req.body.firstName;
        const lastName = req.body.lastName;
        const email =req.body.email;
        const password =req.body.password;
        const phone =req.body.phone;
        const address = req.body.address;

        if(firstName)await User.updateOne({_id:id},{$set:{firstName:firstName}});
        if(lastName)await User.updateOne({_id:id},{$set:{lastName:lastName}});
        if(email)await User.updateOne({_id:id},{$set:{email:email}});
        if(password)await User.updateOne({_id:id},{$set:{password:password}});
        if(phone)await User.updateOne({_id:id},{$set:{phone:phone}});
        if(address)await User.updateOne({_id:id},{$set:{address:address}});
        res.json({msg: 'User was updated successfully'});
   }
        catch(error) {
        res.json({msg:error.message});
   } 
};



exports.deleteUser = async(req,res)=>{

    try{
        const id = req.params.id;
        const deletedUser = await User.deleteOne({"_id":id});
        if(!deletedUser) res.status(400).send({error:'User was not found'});
        res.json({msg:'User was deleted successfully', data: deletedUser});
    }catch(error) {
        res.json({error:error.message});
   }
};




