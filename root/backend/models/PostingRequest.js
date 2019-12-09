const mongoose = require('mongoose') 
const Schema = mongoose.Schema


const PostingRequestSchema = new Schema({
    senderID:{
        type : Schema.Types.ObjectId ,
        required : true 
    },
    operation :{ // 0->Donate , 1->Exchange ,2-> sell 
        type : Integer
    },
    ItemID:{ // for exachange or donation 
        type : Schema.Types.ObjectId ,
        ref:'Item'
    } ,
    price:{ // if it is for selling . if it is selling and the price is not present so it is betting   . 
        type :Integer
    } , 
    paymentMethod :{ // 0 -> cash , 1->Visa , 2 -> Both // the seller define which one he wants . 
        type:Integer 
    },
    state:{ // 1->for selling , 2-> for exchange , -1 ->soldOut , -2 -> exchanged . 
        type : Integer 
    }
 
})


module.exports = mongoose.model('PostingRequest' , PostingRequestSchema)