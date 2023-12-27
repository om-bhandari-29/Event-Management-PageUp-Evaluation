const express = require('express');
const router = express.Router();
const organizationAuthController = require('./../controller/organizationAuthController.js');

router.post('/signup', organizationAuthController.signup);
router.post('/signin', organizationAuthController.signin);

module.exports = router;