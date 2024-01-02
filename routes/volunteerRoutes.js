const express = require("express");
const router = express.Router();
const volunteerController = require('../controller/volunteerController.js');

router.post('/signup', volunteerController.signup);
router.post('/signin', volunteerController.signin);
router.get('/signout', volunteerController.signout);
router.get('/getAllVolunteer', volunteerController.getAllVolunteer);
router.delete('/:dId', volunteerController.deleteVolunteer);
router.get('/details/:id', volunteerController.getVolunteerDetails);
// router.get('/assignedEvents', volunteerController.LoggedInUser, volunteerController.getAssignedEvents);





module.exports = router;