const Volunteer = require('../model/volunteerModel.js');
const sendJwt = require('./sendJwt.js');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const {name, email, number, password, place, skills, gender} = req.body;
    // const email = req.body.email;
    let existingVolunteer;

    try{
        existingVolunteer = await Volunteer.findOne({email});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status: 'ECV',
            message: 'error checking volunteer',
            error : err
        })
    }

    if(existingVolunteer){
        return res.status(400).json({
          user: existingVolunteer,
          status: "UAE",
          message: "User already exists with the given email id"
        });
    }

    try{
        const newVolunteer = new Volunteer({
            name,
            email,
            password,
            place,
            skills,
            number,
            gender
        });

        const newVol = await newVolunteer.save();
        // sendJwt.createSendToken(newVol, 200, res, volSignup);
        res.status(200).json({
            status: "success",
            message: "Volunteer registered successfully"
        })
    }
    catch(err){
        console.log("error in volunteerController.js line 49");
        console.log("Error : "+err);
        res.status(500).json({
            status: 'err',
            message: 'error while creating user',
            err
        })
    }
}

exports.signin = async(req, res) => {
    const {email, password} = req.body;
    let isVolunteerExists;

    try{
        isVolunteerExists = await Volunteer.findOne({email});
    }
    catch(err){
        console.log("Error at volunteerController.js line 62");
        res.status(500).json({
            status: 'err',
            message: 'error while checking that user already exists or not',
            err
        })
    }

    if(!isVolunteerExists){
        return res.status(404).json({
            status: 'UDN',
            message: 'user does not exists with the given mail id line 77'
        })
    }

    const isPasswordCorrect = (isVolunteerExists.password == password)? true : false;

    if(isPasswordCorrect == false){
        res.status(400).json({
            status: 'WP',
            message: 'Provided password is wrong'
        })
    }

    sendJwt.createSendToken(isVolunteerExists, 200, res);
}

exports.signout = async (req, res) =>{
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 300 + 1000),
      httpOnly: true
    })
    
    res.status(200).json({
      status: 'success',
      message: 'Logged Out Successfully'
    })
  }

exports.getAllVolunteer = async(req, res) => {
    let allVolunteer, dataCount;
    try{
        allVolunteer = await Volunteer.find();
        dataCount = await Volunteer.find().count();
    }
    catch(err){
        console.log("Error fetching all volunteers");
        return res.status(500).json({
            message: 'Error fetching all volunteers'
        })
    }

    const newAllVolunteer = allVolunteer.map((vol) => {
        return {
            name: vol.name,
            email: vol.email,
            place: vol.place,
            skills: vol.skills
        }
    });

    res.status(200).json({
        status: 'Success',
        message: 'Data fetched Successfully',
        data: {
            total: dataCount,
            // allVolunteer
            newAllVolunteer
        }
    })
}

exports.deleteVolunteer = async(req, res) => {
    const id = req.params.dId;
    // console.log("delete vol id : "+id)

    try{
        await Volunteer.findByIdAndDelete({_id: id});
    }
    catch(err){
        console.log("Error deleting volunteer");
        return res.status(500).json({
            message: 'Error deleting volunteer'
        })
    }

    res.status(200).json({
        status: 'success',
        message: 'volunteer deleted successfully',
    })
}

exports.getVolunteerDetails = async(req, res) => {
    const id = req.params.id;
    var volunteer;

    try{
        volunteer = await Volunteer.findById({_id: id});
    }
    catch(err){
        console.log("Error fetching volunteer details");
        return res.status(500).json({
            message: 'Error fetching volunteer details'
        })
    }

    const newVolunter = Object.assign({}, {
        name: volunteer.name,
        email: volunteer.email,
        place: volunteer.place,
        skills: volunteer.skills
    })

    res.status(200).json({
        status: 'Success',
        message: 'volunteer details fetched successfully',
        newVolunter
    })
}

exports.LoggedInUser = async (req, res, next) =>{
    // console.log(req.cookies.jwt);
    if(req.cookies.jwt) 
    {
        try {
            const jwtToken = req.cookies.jwt;
            const decoded =  jwt.verify(jwtToken, process.env.JWT_SECRET);

            const currentVol = await Volunteer.findById(decoded.id);

            if (!currentVol) {
                return next();
            }
  
        // THERE IS A LOGGED IN USER
        res.locals.user = currentVol;
        console.log(res.locals.user._id);
        return next();
      } 
      catch (err) {
        return next();
      }
    }
    // else{
    //     console.log("no user")
    // }
    next();
};

