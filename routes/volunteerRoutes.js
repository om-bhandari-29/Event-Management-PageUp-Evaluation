const express = require("express");
const router = express.Router();
const volunteerController = require('../controller/volunteerController.js');

router.post('/signup', volunteerController.signup);
router.post('/signin', volunteerController.signin);
router.get('/getAllVolunteer', volunteerController.getAllVolunteer);
router.delete('/:id', volunteerController.deleteVolunteer);
router.get('/details/:id', volunteerController.getVolunteerDetails);





module.exports = router;