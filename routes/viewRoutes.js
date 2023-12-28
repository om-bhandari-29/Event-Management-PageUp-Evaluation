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

router.get('/organizationSignup', viewsController.organizationSignup);


module.exports = router;

