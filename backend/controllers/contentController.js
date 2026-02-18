const Content = require('../models/Content');

// Get content by section
exports.getContentBySection = async (req, res) => {
  try {
    const contents = await Content.find({ sectionId: req.params.sectionId })
      .sort({ order: 1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single content
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate({
        path: 'sectionId',
        populate: { path: 'categoryId' }
      });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create content
exports.createContent = async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update content
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search content
exports.searchContent = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json([]);
    }

    const contents = await Content.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { theory: { $regex: q, $options: 'i' } },
        { notes: { $regex: q, $options: 'i' } }
      ]
    })
    .limit(10)
    .populate({
      path: 'sectionId',
      populate: { path: 'categoryId' }
    });

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};