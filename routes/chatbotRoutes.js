const express = require('express');
const router = express.Router();
const { askOpenAI } = require('../controllers/ChatbotController');

router.post('/ask', askOpenAI);

module.exports = router;
