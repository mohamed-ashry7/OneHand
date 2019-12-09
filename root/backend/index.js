

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/keys')
const cors = require("cors")
const app = express()
const users = require("./routes/api/users");
const items = require("./routes/api/items");
const notifications = require("./routes/api/notifications");
const offerRequests = require("./routes/api/offerRequests");
const stripePayment = require('./routes/api/stripeApi') ; 
const bodyParser = require('body-parser');

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
app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())


app.use("/api/users",users);
app.use("/api/items",items);
app.use("/api/notifications",notifications);
app.use("/api/offerRequests",offerRequests);
app.use('/api/stripePayment', stripePayment) ; 




app.get("/",(req,res)=>{
    res.send("Root Page ") 
})
const Port = process.env.PORT || 3001
app.listen(Port,()=>{
    console.log(`WORKING Fine `)
})

