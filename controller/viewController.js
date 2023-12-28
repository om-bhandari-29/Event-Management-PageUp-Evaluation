const Volunteer = require('./../model/volunteerModel.js');

exports.index = async(req, res) => {
    res.status(200).render('index', {
        title: 'Home'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.volLogin = async(req, res) => {
    res.status(200).render('volLogin', {
        title: 'Login'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.orgLogin = async(req, res) => {
    res.status(200).render('orgLogin', {
        title: 'Login'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.volunteerSignup = async(req, res) => {
    res.status(200).render('volunteerSignup', {
        title: 'Sign Up'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.volunteerHome = async(req, res) => {
    res.status(200).render('volunteerHome', {
        title: 'Home'
        // allPosts: post
        // allPosts: withDuration
    });
}

exports.organizationSignup = async(req, res) => {
    res.status(200).render('organizationSignup', {
        title: 'Sign Up'
        // allPosts: post
        // allPosts: withDuration
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