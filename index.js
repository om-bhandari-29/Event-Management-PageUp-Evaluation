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
}).then(function(){
    console.log("Database connected successfully");
}).catch(function(err){
    console.log("Error occured while connecting to DB + "+err);
});

app.use(express.json()); //to parse json from body (body parser) and to tell node js that we are using data in json format
app.use(morgan("common"));


//user defined
const volunteerRoutes = require('./routes/volunteerAuthRoutes.js');
const organizationRoutes = require('./routes/organizationAuthRoutes.js');

app.use('/api/volunteer', volunteerRoutes);
app.use('/api/organization', organizationRoutes);
