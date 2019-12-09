const mongoose = require('mongoose') 
const Schema = mongoose.Schema


const OfferRequestSchema = new Schema({
    senderID:{
        type : Schema.Types.ObjectId ,
        required : true ,
        ref:'User'
    },
    recieverID:{
        type : Schema.Types.ObjectId ,
        required : true ,
        ref:'User'
    },
    operation :{ //0-> Exchange ,1-> Buy 
        type : Number
    },
    ItemID:{ // for exachange or donation 
        type : Schema.Types.ObjectId ,
        ref:'Item'
    } ,
    price:{ // if there is a bet . 
        type :Number
    } , 
    paymentMethod :{ // 0 -> cash , 1->Visa 
        type:Number 
    } , 
    state : { // 0-> pending , 1 -> reject , 2->accept
        type :Number
    }
    
})


module.exports = mongoose.model('OfferRequest' , OfferRequestSchema)