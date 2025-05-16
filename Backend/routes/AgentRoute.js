const express = require('express');
const router = express.Router();
const { signupAgent , getAgentList , deleteAgent } = require('../Controllers/agentController.js');

router.post('/signup', signupAgent);
router.get('/list', getAgentList);
router.delete('/delete/:email', deleteAgent);

module.exports = router;
