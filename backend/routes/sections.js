const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const auth = require('../middlewares/auth');  // Changed from 'middleware' to 'middlewares'

// Get all sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find().populate('categoryId');
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get sections by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const sections = await Section.find({ categoryId: req.params.categoryId })
      .sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single section
router.get('/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).populate('categoryId');
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create section (protected)
router.post('/', auth, async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;