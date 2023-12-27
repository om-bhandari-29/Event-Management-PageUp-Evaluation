const Organization = require('../model/organizationModel.js');

exports.signup = async(req, res) => {
    const { name, email, mobileNumber, password, confirmPassword, establishedOn, mainBranch, place } = req.body;

    let existingOrganization;

    try{
        existingOrganization = await Organization.findOne({email});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status: 'ECO',
            message: 'error checking existingOrganization',
            error : err
        })
    }

    if(existingOrganization){
        return res.status(400).json({
          status: "OAE",
          message: "Organization already exists"
        });
    }

    try{
        const newOrganization = new Organization({
            name,
            email,
            mobileNumber,
            password,
            establishedOn,
            mainBranch,
            place
        });

        await newOrganization.save();

        res.status(200).json({
            status: 'success',
            message: 'Organization Registered successfully'
        })
    }
    catch(err){
        console.log("error in organizationAuthController.js line 44");
        console.log("Error : "+err);
        res.status(500).json({
            // status: 'err',
            message: 'error while Registereing Organization',
            err
        })
    }
}

exports.signin = async(req, res) => {
    const {email, password} = req.body;
    let isOrganizationExists;

    try{
        isOrganizationExists = await Organization.findOne({email});
    }
    catch(err){
        console.log("Error at OrganizationAuthController.js line 63");
        res.status(500).json({
            // status: 'err',
            message: 'error while checking that Organization already exists or not',
            err
        })
    }

    if(!isOrganizationExists){
        return res.status(404).json({
            // status: 'err',
            message: 'Organization does not exists with the given mail id'
        })
    }

    const isPasswordCorrect = (isOrganizationExists.password == password)? true : false;

    if(isPasswordCorrect == true){
        res.status(200).json({
            status: 'success',
            message: 'Organization logged in successfully'
        })
    }
    else{
        res.status(200).json({
            status: 'fail',
            message: 'Password is incorrect'
        })   
    }
}

exports.getAllOrganization = async(req, res) => {
    let allOrganization, dataCount;
    try{
        allOrganization = await Organization.find();
        dataCount = await Organization.find().count();
    }
    catch(err){
        console.log("Error fetching all Organization");
        return res.status(500).json({
            message: 'Error fetching all Organization'
        })
    }

    const newallOrganization = allOrganization.map((vol) => {
        return {
            name: vol.name,
            establishedOn: vol.establishedOn,
            place: vol.place,
            mainBranch: vol.mainBranch
        }
    });

    res.status(200).json({
        status: 'Success',
        message: 'Data fetched Successfully',
        data: {
            total: dataCount,
            // allOrganization
            newallOrganization
        }
    })
}

exports.deleteOrganization = async(req, res) => {
    const id = req.params.id;

    try{
        await Organization.findByIdAndDelete({_id: id});
    }
    catch(err){
        console.log("Error deleting Organization");
        return res.status(500).json({
            message: 'Error deleting Organization'
        })
    }

    res.status(200).json({
        status: 'Success',
        message: 'Organization deleted successfully',
    })
}

exports.getOrganizationDetails = async(req, res) => {
    const id = req.params.id;
    let organization;

    try{
        organization = await Organization.findById({_id: id});
    }
    catch(err){
        console.log("Error fetching organization details");
        return res.status(500).json({
            message: 'Error fetching organization details'
        })
    }

    const newOrganization = Object.assign({}, {
        name: organization.name,
        establishedOn: organization.establishedOn,
        place: organization.place,
        mainBranch: organization.mainBranch
    })

    res.status(200).json({
        status: 'Success',
        message: 'volunteer details fetched successfully',
        newOrganization
    })
}