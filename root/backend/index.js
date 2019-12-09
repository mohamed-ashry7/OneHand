

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/keys')
const app = express()
const users = require("./routes/api/users");
const items = require("./routes/api/items");
const notifications = require("./routes/api/notifications");
const offerRequests = require("./routes/api/offerRequests");
const cors = require("cors");
const bodyParser = require('body-parser');

var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' })

app.use(jsonParser);
app.use(urlencodedParser);

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


app.use("/api/users",users);
app.use("/api/items",items);
app.use("/api/notifications",notifications);
app.use("/api/offerRequests",offerRequests);





app.get("/",(req,res)=>{
    res.send("Root Page ") 
})
const Port = 3000 |process.env.PORT
app.listen(Port,()=>{
    console.log(`WORKING ON PORT ${Port}`)
})
