const Event = require('./../model/eventModel.js');

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