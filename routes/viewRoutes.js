const express = require('express');
const router = express.Router();
const viewsController = require('./../controller/viewController.js');

router.get('/', viewsController.index);
router.get('/login', viewsController.login);
router.get('/volunteerSignup', viewsController.volunteerSignup);

module.exports = router;

