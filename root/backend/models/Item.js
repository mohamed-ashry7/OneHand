const mongo = require('mongoose');
const schema = mongo.Schema;

const ItemSchema = new schema({
    type:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Double,
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
    payerID :{
        type : Schema.Types.ObjectId,
        ref:'User',
    }
});

module.exports = Item = mongo.model('Item',ItemSchema);
