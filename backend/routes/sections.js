const express = require('express');
const router = express.Router();
const {
  getSectionsByCategory,
  getSectionById,
  createSection,
  updateSection,
  deleteSection
} = require('../controllers/sectionController');
const auth = require('../middleware/auth');

// Public routes
router.get('/category/:categoryId', getSectionsByCategory);
router.get('/:id', getSectionById);

// Protected routes
router.post('/', auth, createSection);
router.put('/:id', auth, updateSection);
router.delete('/:id', auth, deleteSection);

module.exports = router;