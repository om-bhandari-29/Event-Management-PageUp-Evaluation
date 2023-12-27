const express = require('express');
const router = express.Router();
const organizationController = require('../controller/organizationController.js');

router.post('/signup', organizationController.signup);
router.post('/signin', organizationController.signin);
router.get('/getAllOrganization', organizationController.getAllOrganization);
router.delete('/:id', organizationController.deleteOrganization);
router.get('/details/:id', organizationController.getOrganizationDetails);

module.exports = router;