const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan'); //to display route that is requested
const path = require('path');
const { connected } = require('process');

dotenv.config();

const port = process.env.PORT;
const db = process.env.MONGO_DB_URL;

app.listen(port, () =>{
    console.log("App running on port : "+port);
});

mongoose.connect(db, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}).then(()=>console.log("Database connected successfully"))
  .catch((err) => console.log("Error occured while connecting to DB + "+err));

/*
app.connect(db, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
}).then(function(){
    console.log("Database connected successfully");
}).catch(function(err){
    console.log("Error occured while connecting to DB + "+err);
});
*/