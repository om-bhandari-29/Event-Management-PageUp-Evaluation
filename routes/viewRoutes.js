const express = require('express');
const router = express.Router();
const volunteerController = require('./../controller/volunteerController.js');
const viewsController = require('./../controller/viewController.js');
const organizationController = require('./../controller/organizationController.js');

router.use(volunteerController.LoggedInUser);
router.use(organizationController.LoggedInOrganization);

router.get('/', viewsController.index);

router.get('/volunteerViews/volLogin', viewsController.volLogin);
router.get('/volunteerViews/volunteerSignup', viewsController.volunteerSignup);
router.get('/volunteerHome', viewsController.volunteerHome);
router.get('/allVolunteer', viewsController.allVolunteer);
router.get('/volunteerViews/assignedEvents', volunteerController.LoggedInUser, viewsController.getAssignedEvents);

router.get('/allEvents', viewsController.allEvents);
router.get('/myEvents', viewsController.myEvents);
router.get('/createEvent', viewsController.createEvent);
router.get('/event/:id', viewsController.getEventDetails);


router.get('/organizationViews/orgLogin', viewsController.orgLogin);
router.get('/organizationViews/organizationSignup', viewsController.organizationSignup);
router.get('/organizationHome', viewsController.organizationHome);
router.get('/:volId', viewsController.getVolunteerDetails);
router.get('/org/:orgId', viewsController.getOrganizationDetails);

module.exports = router;

