

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/keys')
const app = express()
const users = require("./routes/api/users");
const items = require("./routes/api/items");
const notifications = require("./routes/api/notifications");
const offerRequests = require("./routes/api/offerRequests");
const bodyParser = require('body-parser'); 
const cors = require("cors");


app.use(cors());


// Connecting to DataBase 
mongoose.connect(config.mongoURI , { useNewUrlParser: true 
    ,useUnifiedTopology: true 
})
.then(()=>{
    console.log("Successful Connection")
})
.catch((err)=>{
    console.log(err)
})



app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users",users);
app.use("/api/items",items);
app.use("/api/notifications",notifications);
app.use("/api/offerRequests",offerRequests);





app.get("/",(req,res)=>{
    res.send("Root Page ") 
})
const Port = 3001 |process.env.PORT
app.listen(Port,()=>{
    console.log(`WORKING ON PORT ${Port}`)
})
