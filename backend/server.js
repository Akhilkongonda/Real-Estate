const express=require("express");
const cors = require('cors');

const mongoose=require('mongoose');

const formRoutes=require('./routes/formRoutes');
 

//express app
const app=express();

app.use(express.json());
app.use(cors());
 


app.use('/api/formdata',formRoutes);




//connect to db

mongoose.connect('mongodb+srv://akhil:1GM5MkZ06A6Vr2PV@mernapp.le4umhu.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp')
    .then((res)=>{
        //listen for requests
        app.listen(4000,()=>{
            console.log("listening on port 4000");
        })
    })
    .catch((error)=>{
        console.log(error)
    })

module.exports=app;

