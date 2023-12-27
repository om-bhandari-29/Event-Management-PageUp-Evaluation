const express = require('express');
const router = express.Router();
const organizationController = require('../controller/organizationController.js');

router.post('/signup', organizationController.signup);
router.post('/signin', organizationController.signin);

module.exports = router;