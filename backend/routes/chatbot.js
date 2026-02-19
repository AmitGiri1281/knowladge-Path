// Clear history
router.delete('/history/:sessionId', async (req, res) => {
  try {
    await ChatHistory.findOneAndDelete({ sessionId: req.params.sessionId });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});