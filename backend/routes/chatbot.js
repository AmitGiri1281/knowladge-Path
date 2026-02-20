const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory'); // make sure this path is correct

// Clear history
router.delete('/history/:sessionId', async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
