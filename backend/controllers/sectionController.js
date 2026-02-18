const Section = require('../models/Section');
const Content = require('../models/Content');

// Get sections by category
exports.getSectionsByCategory = async (req, res) => {
  try {
    const sections = await Section.find({ categoryId: req.params.categoryId })
      .sort({ order: 1 })
      .populate('categoryId', 'name');
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single section with content count
exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate('categoryId', 'name');
    
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    const contentCount = await Content.countDocuments({ sectionId: section._id });
    
    res.json({
      ...section.toObject(),
      contentCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create section
exports.createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update section
exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete section
exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    // Delete all content in this section
    await Content.deleteMany({ sectionId: req.params.id });
    
    res.json({ message: 'Section and its content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};