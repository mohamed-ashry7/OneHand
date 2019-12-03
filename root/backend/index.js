

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/keys')
const app = express()

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








app.get("/",(req,res)=>{
    res.send("Root Page ") 
})
const Port = 3000 |process.env.PORT
app.listen(Port,()=>{
    console.log(`WORKING ON PORT ${Port}`)
})
