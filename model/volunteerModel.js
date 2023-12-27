const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    mobileNumber : {
        type: Number,
        // require: true,
    },

    yearOfbirth: {
        type: Number
        // require: true
    },
    
    place: String,
    skills:{
        type: String
    },
    
    password: {
        type: String,
        require: true,
        min: 10,
        max: 20
    },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);