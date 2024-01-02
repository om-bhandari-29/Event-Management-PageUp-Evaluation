const mongoose = require('mongoose');
const Event = require('./eventModel');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },

    gender:{
        type: String,
        required: true
    },
    
    email: {
        type: String,
        require: true,
        unique: true
    },
    number: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Example: Validate that the number contains only digits and has a specific length
            return /^\d{9,10}$/.test(value); // Change the regex pattern as per your requirement
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
    
    assignedEvents: [mongoose.Schema.ObjectId]
});

// volunteerSchema.post('save', async function() {
//     try {
//         const Event = require('./eventModel.js');
//         const events = await Event.find(); // Fetching all events

//         const volunteerId = this._id; // Get the ID of the saved volunteer
        
//         console.log("events : "+events);
//         console.log("volunteerId :"+volunteerId);
        
//         events.forEach(async (eve) => {
//             eve.unselectedVolunteer.push(volunteerId);
//             await eve.save();
//         })
//         console.log("events : "+events);
//     } catch (error) {
//         console.error(error);
//     }
// });

module.exports = mongoose.model("Volunteer", volunteerSchema);