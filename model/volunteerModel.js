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

    // mobileNumber : {
    //     type: Number,
    //     // require: true,
    // },
    number: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Example: Validate that the number contains only digits and has a specific length
            return /^\d{7,14}$/.test(value); // Change the regex pattern as per your requirement
          },
          message: 'Number should contain only digits and be between 9 to 10 characters',
        },
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