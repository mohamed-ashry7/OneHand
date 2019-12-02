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
    category :{ //0-> Exchange ,1-> Buy 
        type : Integer
    },
    ItemID:{ // for exachange or donation 
        type : Schema.Types.ObjectId ,
        ref:'Item'
    } ,
    price:{ // if there is a bet . 
        type :Integer
    } , 
    paymentMethod :{ // 0 -> cash , 1->Visa 
        type:Integer 
    } , 
    state : { // 0-> pending , 1 -> reject , 2->accept
        type :Integer
    }
    
})


module.exports = mongoose.model('OfferRequest' , OfferRequestSchema)