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
            status: 'err',
            message: 'error while creating user',
            err
        })
    }
}