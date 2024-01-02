const mongoose = require('mongoose');
// const Volunteer = require('./volunteerModel.js');

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
    date: {
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
        require: true,
        default: null
    },
    unselectedVolunteer: [mongoose.Schema.ObjectId],
    acceptedRequest: [mongoose.Schema.ObjectId]
})

eventSchema.pre('save', async function(next){
    try {
        const Volunteer = require('./volunteerModel.js');
        const volunteers = await Volunteer.find();
        volunteers.forEach(vol => {
            this.unselectedVolunteer.push(vol._id);
        });
    } catch (error) {
        console.log("Error "+error);
    }
    next();
})


module.exports = mongoose.model("Event", eventSchema);