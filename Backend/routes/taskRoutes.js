const express = require('express');
const router = express.Router();
const { distributeTasks } = require('../Controllers/taskController.js');

router.post('/distribute', distributeTasks);

module.exports = router;
