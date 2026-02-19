const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const Category = require('../models/Category');
const Section = require('../models/Section');
const User = require('../models/User');
const auth = require('../middlewares/auth');  // Changed from 'middleware' to 'middlewares'

// Get content by section (public)
router.get('/section/:sectionId', async (req, res) => {
  try {
    const contents = await Content.find({ sectionId: req.params.sectionId })
      .sort({ order: 1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single content (public)
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate('sectionId');
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search content (public)
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    const contents = await Content.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { theory: { $regex: q, $options: 'i' } }
      ]
    }).limit(parseInt(limit));
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

// Get trending content
router.get('/trending', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const contents = await Content.find()
      .sort({ views: -1 })
      .limit(limit)
      .populate('sectionId');
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured content
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const contents = await Content.aggregate([
      { $sample: { size: limit } }
    ]);
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const categories = await Category.countDocuments();
    const sections = await Section.countDocuments();
    const topics = await Content.countDocuments();
    const users = await User.countDocuments();
    
    res.json({ categories, sections, topics, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Increment view count (public)
router.post('/:id/view', async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ views: content.views });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create content (protected)
router.post('/', auth, async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update content (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete content (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ message: 'Content not found' });
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;