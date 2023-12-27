const express = require("express");
const router = express.Router();
const volunteerAuthController = require('./../controller/volunteerAuthController.js');

router.post('/signup', volunteerAuthController.signup);
router.post('/signin', volunteerAuthController.signin);





module.exports = router;