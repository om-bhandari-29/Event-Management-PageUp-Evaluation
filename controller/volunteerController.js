const Volunteer = require('../model/volunteerModel.js');

exports.signup = async (req, res) => {
    const email = req.body.email;
    let existingUser;

    try{
        existingUser = await Volunteer.findOne({email});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status: 'err',
            message: 'error checking user',
            error : err
        })
    }

    if(existingUser){
        return res.status(400).json({
          status: "UAE",
          message: "User already exists with the given email id"
        });
    }

    try{
        const {name, email, mobileNumber, password} = req.body;
        const newVolunteer = new Volunteer({
            name,
            email,
            mobileNumber,
            password
        });

        await newVolunteer.save();

        res.status(200).json({
            status: 'success',
            message: 'new volunteer created successfully'
        })
    }
    catch(err){
        console.log("error in volunteerAuthController.js line 43");
        console.log("Error : "+err);
        res.status(500).json({
            // status: 'err',
            message: 'error while creating user',
            err
        })
    }
}

exports.signin = async(req, res) => {
    const {email, password} = req.body;
    let isUserExists;

    try{
        isUserExists = await Volunteer.findOne({email});
    }
    catch(err){
        console.log("Error at volunteerAuthController.js line 60");
        res.status(500).json({
            // status: 'err',
            message: 'error while checking that user already exists or not',
            err
        })
    }

    if(!isUserExists){
        return res.status(404).json({
            // status: 'err',
            message: 'user does not exists with the given mail id'
        })
    }

    const isPasswordCorrect = (isUserExists.password == password)? true : false;

    if(isPasswordCorrect == true){
        res.status(200).json({
            status: 'success',
            message: 'user logged in successfully'
        })
    }
    else{
        res.status(200).json({
            status: 'fail',
            message: 'Password is incorrect'
        })   
    }
}