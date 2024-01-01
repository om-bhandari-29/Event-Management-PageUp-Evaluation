const Volunteer = require('./../model/volunteerModel.js');
const Event = require('./../model/eventModel.js');

exports.index = async(req, res) => {
    res.status(200).render('index', {
        title: 'Home'
    });
}


//VOLUNTEER
exports.volunteerSignup = async(req, res) => {
    res.status(200).render('volunteerViews/volunteerSignup', {
        title: 'Sign Up'
    });
}

exports.volLogin = async(req, res) => {
    res.status(200).render('volunteerViews/volLogin', {
        title: 'Login'
    });
}

exports.volunteerHome = async(req, res) => {
    res.status(200).render('volunteerHome', {
        title: 'Home'
    });
}

//ORGANIZATION
exports.orgLogin = async(req, res) => {
    res.status(200).render('organizationViews/orgLogin', {
        title: 'Login'
    });
}


exports.organizationSignup = async(req, res) => {
    res.status(200).render('organizationViews/organizationSignup', {
        title: 'Sign Up'
    });
}

exports.allVolunteer = async(req, res) => {
    var allVolunteers;
    try{
        allVolunteers  = await Volunteer.find();
    }
    catch(err){
        console.log(err);
    }

    res.status(200).render('allVolunteer', {
        title: 'All Volunteer',
        volunteers: allVolunteers
    });
}

exports.allEvents = async(req, res) => {
    var events;
    try{
        events = await Event.find();
    }
    catch(err){
        console.log(err);
    }

    res.status(200).render('allEvents', {
        title: 'All Events',
        events: events
    });
}
exports.myEvents = async(req, res) => {
    // req.loggedInOrg.createdById
    // console.log(req.loggedInOrg.createdById);
    var events;
    try{
        events = await Event.find({createdById: req.loggedInOrg._id});
    }
    catch(err){
        console.log(err);
    }

    // console.log("events : "+events);
    res.status(200).render('myEvents', {
        title: 'All Events',
        events: events
    });
}

exports.createEvent = async(req, res) => {
    res.status(200).render('createEvent', {
        title: 'Create Event',
    });
}

exports.getVolunteerDetails = async(req, res) => {
    const volId = req.params.volId;
    console.log(volId);
    var volunteer;
    try{
        volunteer  = await Volunteer.findById(volId);
    }
    catch(err){
        console.log(err);
    }
    
    // console.log(volunteer);
    res.status(200).render('volunteerDetails', {
        title: 'Volunteer Details',
        volunteer: volunteer
    });
}

exports.getEventDetails = async(req, res) => {
    const id = req.params.id;
    // console.log(id);
    var event;
    var volunteer;
    try{
        event  = await Event.findById(id);
        volunteer = await Volunteer.find();
    }
    catch(err){
        console.log(err);
    }
    
    res.status(200).render('eventDetails', {
        title: 'Event Details',
        event: event,
        volunteers: volunteer
    });
}

exports.organizationHome = async(req, res) => {
    res.status(200).render('organizationHome', {
        title: 'Organization Home'
        // allPosts: post
        // allPosts: withDuration
    });
}
exports.getOrganizationDetails = async(req, res) => {
    res.status(200).render('organizationDetails', {
        title: 'Organization Details'
        // allPosts: post
        // allPosts: withDuration
    });
}