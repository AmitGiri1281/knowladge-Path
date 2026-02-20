const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Category = require('../models/Category');
const Section = require('../models/Section');
const Content = require('../models/Content');
const adminAuth = require('../middlewares/admin');  // ← FIXED: added 's'
const auth = require('../middlewares/auth');       // ← FIXED: added 's'

// All admin routes are protected by adminAuth
router.use(adminAuth);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role (make admin)
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        role: role,
        isAdmin: role === 'admin'
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalCategories, totalSections, totalContent] = await Promise.all([
      User.countDocuments(),
      Category.countDocuments(),
      Section.countDocuments(),
      Content.countDocuments()
    ]);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    const recentContent = await Content.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('sectionId');

    res.json({
      totals: {
        users: totalUsers,
        categories: totalCategories,
        sections: totalSections,
        content: totalContent
      },
      recentUsers,
      recentContent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;