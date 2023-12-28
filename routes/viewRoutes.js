const express = require('express');
const router = express.Router();
const volunteerController = require('./../controller/volunteerController.js');
const viewsController = require('./../controller/viewController.js');

router.use(volunteerController.LoggedInUser);

router.get('/', viewsController.index);

router.get('/volLogin', viewsController.volLogin);
router.get('/orgLogin', viewsController.orgLogin);
router.get('/volunteerSignup', viewsController.volunteerSignup);
router.get('/volunteerHome', viewsController.volunteerHome);
router.get('/allVolunteer', viewsController.allVolunteer);
router.get('/allEvents', viewsController.allEvents);

router.get('/organizationSignup', viewsController.organizationSignup);
router.get('/:volId', viewsController.getVolunteerDetails);


module.exports = router;

