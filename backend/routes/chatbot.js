const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getHistory,
  clearHistory
} = require('../controllers/chatbotController');

router.post('/message', sendMessage);
router.get('/history/:sessionId', getHistory);
router.delete('/history/:sessionId', clearHistory);

module.exports = router;