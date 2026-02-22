const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');


// ✅ Get chat history (FIXED)
router.get('/history/:sessionId', async (req, res) => {
  try {
    const chat = await ChatHistory.findOne({ sessionId: req.params.sessionId });

    // 🔥 return only messages array
    res.json(chat ? chat.messages : []);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Send message (FIXED)
router.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ message: "SessionId and message required" });
    }

    let chat = await ChatHistory.findOne({ sessionId });

    if (!chat) {
      chat = new ChatHistory({ sessionId, messages: [] });
    }

    // Save user message
    chat.messages.push({ role: 'user', content: message });

    // 👉 Dummy AI reply
    const botReply = "Hello Amit! I am your AI assistant 🚀";

    // Save bot reply (🔥 role must match frontend)
    chat.messages.push({ role: 'bot', content: botReply });

    await chat.save();

    // 🔥 Return full history for React UI
    res.json({
      history: chat.messages
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Clear history
router.delete('/history/:sessionId', async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;