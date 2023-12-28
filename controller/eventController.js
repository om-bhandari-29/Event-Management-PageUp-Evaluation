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
        console.log("Error : "+err);
        res.status(500).json({
            // status: 'err',
            message: 'error while creating new event',
            err
        })
    }
}