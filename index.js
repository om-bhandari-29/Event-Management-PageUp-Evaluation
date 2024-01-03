const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan'); //to display route that is requested
const path = require('path');
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug'); //to tell express which template engine we are going to use
app.set('views', path.join(__dirname, 'views')); //this line is to tells that, where our view is stored


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
const volunteerRoutes = require('./routes/volunteerRoutes.js');
const organizationRoutes = require('./routes/organizationRoutes.js');
const viewsRoutes = require('./routes/viewRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');


app.use('/', viewsRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/event', eventRoutes);
