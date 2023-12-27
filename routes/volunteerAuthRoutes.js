const express = require("express");
const router = express.Router();
const volunteerController = require('../controller/volunteerController.js');

router.post('/signup', volunteerController.signup);
router.post('/signin', volunteerController.signin);





module.exports = router;