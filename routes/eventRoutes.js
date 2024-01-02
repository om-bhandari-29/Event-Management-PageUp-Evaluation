const express = require('express');
const router = express.Router();
const eventController = require('./../controller/eventController.js');
const organizationController = require('./../controller/organizationController.js');

router.use(organizationController.LoggedInOrganization);

router.post('/create', eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);
router.put('/:eventId/:volId', eventController.assignEvent);
router.put('/accept/:eventId/:volId', eventController.acceptRequest);

module.exports = router;