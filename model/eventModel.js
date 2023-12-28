const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 50
    },

    place: {
        type: String,
        require: true
    },
    Date: {
        type: Date, 
        require: true
    },
    description: {
        type: String,
        require: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    },
    
    createdById: {
        type: mongoose.Schema.ObjectId,
        require: true
    }
})

module.exports = mongoose.model("Event", eventSchema);