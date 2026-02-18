// Get recent content
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const contents = await Content.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('sectionId');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trending content (you can implement your own logic)
router.get('/trending', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    // For now, just get random content
    const contents = await Content.aggregate([
      { $sample: { size: limit } }
    ]);
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});