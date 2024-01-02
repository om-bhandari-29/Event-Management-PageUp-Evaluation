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

exports.getEventDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        const allVolunteer = await Volunteer.find();
        const selectedVolunteerIds = event.selectedVolunteer.map(volId => volId.toString()); // Convert selected volunteer IDs to strings for comparison
        const eventPlaceLowerCase = event.place.toLowerCase();

        const volunteerPromises = allVolunteer.map(async (vol) => {
            const volIdString = vol._id.toString();
            const volPlaceLowerCase = vol.place.toLowerCase()
            if (!selectedVolunteerIds.includes(volIdString) && volPlaceLowerCase === eventPlaceLowerCase) {
                return vol;
            }
        });

        const unselectedVol = (await Promise.all(volunteerPromises)).filter(Boolean);

        console.log(unselectedVol);
        const requestPromises = event.acceptedRequest.map(async (volId) => {
            const vol = await Volunteer.findById(volId);
            return vol;
        })
        const requestAccept = await Promise.all(requestPromises);

        res.status(200).render('eventDetails', {
            title: 'Event Details',
            event: event,
            unselectedVolunteers: unselectedVol,
            requestAcceptedVolunteer: requestAccept
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.organizationHome = async(req, res) => {
    res.status(200).render('organizationHome', {
        title: 'Organization Home'
    });
}
exports.getOrganizationDetails = async(req, res) => {
    res.status(200).render('organizationDetails', {
        title: 'Organization Details'
    });
}

exports.getAssignedEvents = async(req, res) => {
    // const currentVol = req.curVol;
    // console.log(currentVol);
    const assignedEvents = req.curVol.assignedEvents;

    const eveA = await Promise.all(assignedEvents.map(async (eventId) => {
        try {
            const event = await Event.findById(eventId);
            return event;
        } catch (error) {
            console.error(`Error finding event with ID ${eventId}:`, error);
            return null; 
        }
    }));

    // console.log(eveA);

    res.status(200).render('volunteerViews/assignedEvent', {
        title: 'Assigned Events',
        assignedEvents: eveA
    })
}