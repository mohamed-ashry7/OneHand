const mongo = require('mongoose');
const Schema = mongo.Schema;

const ItemSchema = new Schema({
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
    },
    category:{
        type:String
    },
    state:{
        type:Boolean,
        required:true,
    },
    photo:{
        data: Buffer,
        contentType: String 
    },
    description:{
        type:String,
    },
    address:{
        type:String,
        required:true
    },
    sellerID :{
        type : Schema.Types.ObjectId,
        ref:'User',
    },
    buyerID :{
        type : Schema.Types.ObjectId,
        ref:'User',
    }
});

module.exports = Item = mongo.model('Item',ItemSchema);
