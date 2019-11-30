

const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    senderID:{
        type : Schema.Types.ObjectId ,
        required : true 
    },
    recieverID:{
        type : Schema.Types.ObjectId ,
    },
    content : {
        type : String ,
        required : true 
    } ,
    date:{
        type : Date , 
        default: Date.now 
    },
    isRead : {
        type : Boolean ,
        default:false
    },
  
})


module.exports = mongoose.model('Notification' , NotificationSchema)