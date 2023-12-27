const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    mobileNumber : {
        type: Number,
        // require: true,
        min: 10,
        max: 10
    },
    establishedOn: Number,
    
    mainBranch: {
        type: String,
        default: null
    },

    password: {
        type: String,
        require: true,
        min: 10,
        max: 20
    },
});

module.exports = mongoose.model("Organization", organizationSchema);