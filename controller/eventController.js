const Event = require('./../model/eventModel.js');
const Volunteer = require('./../model/volunteerModel.js');

exports.createEvent = async(req, res) => {
    const orgName = req.loggedInOrg.name;
    const {name, place, date, description, startTime, endTime} = req.body;

    try{
        const event = new Event({
            name, 
            place, 
            date, 
            description,
            startTime, 
            endTime,
            createdBy: orgName,
            createdById: req.loggedInOrg._id
        })

        await event.save();

        res.status(200).json({
            status: 'success',
            message: 'Event Created successfully'
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: 'err',
            message: 'error while creating new event',
            err
        })
    }
}

exports.getEventDetails = async(req, res) => {
    const id = req.params.id;
    let event;
    try{
        event = await Event.findById(id);
    }
    catch(err){
        console.log("at eventController.js line 43 "+err);
        return res.status(500).json({
            status: 'err',
            err
        })
    }

    res.status(200).json({
        statur: 'success',
        message: 'retrieved Event details successfully'
    })
}

exports.deleteEvent = async(req, res) => {
    const id = req.params.id;
    // console.log("delete vol id : "+id)

    try{
        await Event.findByIdAndDelete({_id: id});
    }
    catch(err){
        console.log("Error deleting volunteer : " +err);
        return res.status(500).json({
            message: 'Error deleting volunteer'
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'event deleted successfully',
    })
}

exports.assignEvent = async(req, res) => {
    const volId = req.params.volId;
    const eventId = req.params.eventId;
    // console.log(volId,eventId);
    
    try{
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            volId,
            { $push: { assignedEvents: eventId } },
            { new: true, upsert: true, useFindAndModify: false }
          );
          
        await Event.findByIdAndUpdate(eventId, 
            { $push: { selectedVolunteer: volId } },
            { new: true, upsert: true, useFindAndModify: false }
        )
        res.status(200).json({
            status: 'success',
            message: 'Event assigned to volunteer'
        })
    }
    catch(err){
        console.log(err);
    }   
}

exports.acceptRequest = async(req, res) => {
    const volId = req.params.volId;
    const eventId = req.params.eventId;
    // console.log(volId,eventId);
    
    try{
        await Volunteer.findByIdAndUpdate(
            volId,
            { $pull: { assignedEvents: eventId } },
            { new: true, upsert: true, useFindAndModify: false }
          );

        await Event.findByIdAndUpdate(eventId, 
            { $push: { acceptedRequest: volId } },
            { new: true, upsert: true, useFindAndModify: false }
        )
        res.status(200).json({
            status: 'success',
            message: 'Event assigned to volunteer'
        })
    }
    catch(err){
        console.log(err);
    }   
}

exports.declineRequest = async(req, res) => {
    const volId = req.params.volId;
    const eventId = req.params.eventId;
    // console.log(volId,eventId);
    
    try{
        await Volunteer.findByIdAndUpdate(
            volId,
            { $pull: { assignedEvents: eventId } },
            { new: true, upsert: true, useFindAndModify: false }
          );

        res.status(200).json({
            status: 'success',
            message: 'Event assigned to volunteer'
        })
    }
    catch(err){
        console.log(err);
    }   
}
