const express = require('express');
const router = express.Router();
const viewsController = require('./../controller/viewController.js');

router.get('/', viewsController.index);

module.exports = router;

