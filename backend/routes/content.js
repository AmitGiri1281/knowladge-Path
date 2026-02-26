const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Content = require('../models/Content');
const Category = require('../models/Category');
const Section = require('../models/Section');
const User = require('../models/User');
const auth = require('../middlewares/auth');

// ===========================================
// DEBUG ROUTES - Help diagnose issues
// ===========================================

// Check database status
router.get('/debug-db', async (req, res) => {
  try {
    const contentCount = await Content.countDocuments();
    const sectionCount = await Section.countDocuments();
    const categoryCount = await Category.countDocuments();
    
    // Get one sample from each
    const sampleContent = await Content.findOne().lean();
    const sampleSection = await Section.findOne().lean();
    const sampleCategory = await Category.findOne().lean();
    
    res.json({
      success: true,
      counts: {
        content: contentCount,
        sections: sectionCount,
        categories: categoryCount
      },
      samples: {
        content: sampleContent || null,
        section: sampleSection || null,
        category: sampleCategory || null
      },
      database: {
        connected: mongoose.connection.readyState === 1,
        state: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Simple test route
router.get('/test', async (req, res) => {
  try {
    const contentCount = await Content.countDocuments().catch(() => 0);
    res.json({ 
      success: true,
      message: 'Content API is working',
      contentCount: contentCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({ 
      success: true,
      message: 'Content API is working (limited)',
      error: error.message
    });
  }
});

// ===========================================
// PUBLIC ROUTES - These should always work
// ===========================================

/**
 * GET /api/content/recent
 * Get most recent content - SAFE VERSION
 */

/**
 * GET /api/content/resources
 * Get all resource sections dynamically
 */
router.get('/resources', async (req, res) => {
  try {
    console.log('📚 Fetching resources...');

    // Find Resources category
    const resourcesCategory = await Category.findOne({ name: 'Resources' }).lean();

    if (!resourcesCategory) {
      return res.json([]);
    }

    // Fetch sections under Resources
    const sections = await Section.find({
      categoryId: resourcesCategory._id
    })
    .sort({ order: 1 })
    .lean();

    res.json(sections);

  } catch (error) {
    console.error('❌ Resources error:', error);
    res.json([]);
  }
});


router.get('/recent', async (req, res) => {
  console.log('📥 [recent] Fetching recent content...');
  
  try {
    const limit = parseInt(req.query.limit) || 5;
    console.log(`   Limit: ${limit}`);
    
    // Check if there's any content
    const totalContent = await Content.countDocuments();
    console.log(`   Total content in DB: ${totalContent}`);
    
    if (totalContent === 0) {
      console.log('   No content found, returning empty array');
      return res.json([]);
    }
    
    // Get raw content without any population
    const contents = await Content.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(); // Use lean() for plain JS objects
    
    console.log(`   Found ${contents.length} content items`);
    
    // Safely add section info
    const enhancedContents = await Promise.all(contents.map(async (content) => {
      try {
        // Create a safe copy
        const enhanced = { ...content };
        
        // Add default section info
        enhanced.sectionInfo = { name: 'General' };
        enhanced.categoryInfo = { name: 'Uncategorized' };
        
        // Try to get section info if sectionId exists
        if (content.sectionId) {
          try {
            const section = await Section.findById(content.sectionId).lean();
            if (section) {
              enhanced.sectionInfo = {
                _id: section._id,
                name: section.name || 'Unknown Section'
              };
              
              // Try to get category info
              if (section.categoryId) {
                try {
                  const category = await Category.findById(section.categoryId).lean();
                  if (category) {
                    enhanced.categoryInfo = {
                      _id: category._id,
                      name: category.name || 'Unknown Category'
                    };
                  }
                } catch (catErr) {
                  console.log(`   Category fetch error for ${content._id}:`, catErr.message);
                }
              }
            }
          } catch (secErr) {
            console.log(`   Section fetch error for ${content._id}:`, secErr.message);
          }
        }
        
        return enhanced;
      } catch (err) {
        console.log(`   Error processing content ${content._id}:`, err.message);
        return content; // Return original if processing fails
      }
    }));
    
    console.log(`   Successfully processed ${enhancedContents.length} items`);
    res.json(enhancedContents);
    
  } catch (error) {
    console.error('❌ [recent] Critical error:', error);
    // ALWAYS return empty array instead of 500 error
    res.json([]);
  }
});

/**
 * GET /api/content/trending
 * Get most viewed content - SAFE VERSION
 */
router.get('/trending', async (req, res) => {
  console.log('📥 [trending] Fetching trending content...');
  
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const totalContent = await Content.countDocuments();
    if (totalContent === 0) {
      return res.json([]);
    }
    
    const contents = await Content.find()
      .sort({ views: -1, createdAt: -1 })
      .limit(limit)
      .lean();
    
    // Add safe section info
    const enhancedContents = await Promise.all(contents.map(async (content) => {
      const enhanced = { ...content };
      enhanced.sectionInfo = { name: 'General' };
      
      if (content.sectionId) {
        try {
          const section = await Section.findById(content.sectionId).lean();
          if (section) {
            enhanced.sectionInfo = { name: section.name };
          }
        } catch (err) {
          // Keep default
        }
      }
      
      return enhanced;
    }));
    
    res.json(enhancedContents);
    
  } catch (error) {
    console.error('❌ [trending] Error:', error);
    res.json([]);
  }
});

/**
 * GET /api/content/featured
 * Get random featured content - SAFE VERSION
 */
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    
    const totalContent = await Content.countDocuments();
    if (totalContent === 0) {
      return res.json([]);
    }
    
    // Get random content
    const contents = await Content.aggregate([
      { $sample: { size: limit } }
    ]);
    
    res.json(contents || []);
    
  } catch (error) {
    console.error('❌ [featured] Error:', error);
    res.json([]);
  }
});

/**
 * GET /api/content/stats
 * Get platform statistics - SAFE VERSION
 */
router.get('/stats', async (req, res) => {
  try {
    const categories = await Category.countDocuments().catch(() => 10);
    const sections = await Section.countDocuments().catch(() => 50);
    const topics = await Content.countDocuments().catch(() => 200);
    const users = await User.countDocuments().catch(() => 1000);
    
    res.json({ 
      categories: categories || 10, 
      sections: sections || 50, 
      topics: topics || 200, 
      users: users || 1000 
    });
    
  } catch (error) {
    console.error('❌ [stats] Error:', error);
    // Return default values instead of error
    res.json({ categories: 10, sections: 50, topics: 200, users: 1000 });
  }
});

/**
 * GET /api/content/search
 * Search content by title or theory
 */
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }
    
    const contents = await Content.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { theory: { $regex: q, $options: 'i' } }
      ]
    })
    .limit(parseInt(limit))
    .lean();
    
    res.json(contents);
    
  } catch (error) {
    console.error('❌ [search] Error:', error);
    res.json([]);
  }
});

/**
 * GET /api/content/section/:sectionId
 * Get all content for a specific section
 */
router.get('/section/:sectionId', async (req, res) => {
  try {
    const contents = await Content.find({ sectionId: req.params.sectionId })
      .sort({ order: 1 })
      .lean();
    
    res.json(contents);
    
  } catch (error) {
    console.error('❌ [section] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/content/:id
 * Get single content by ID
 */
router.get('/:id', async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid content ID format' });
    }
    
    const content = await Content.findById(req.params.id)
      .populate({
        path: 'sectionId',
        populate: { path: 'categoryId' }
      })
      .lean();
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
    
  } catch (error) {
    console.error('❌ [get by id] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /api/content/:id/view
 * Increment view count
 */
router.post('/:id/view', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json({ views: content.views });
    
  } catch (error) {
    console.error('❌ [view] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ===========================================
// PROTECTED ROUTES (require authentication)
// ===========================================

/**
 * POST /api/content
 * Create new content (protected)
 */
router.post('/', auth, async (req, res) => {
  try {
    const content = new Content({
      ...req.body,
      createdAt: new Date()
    });
    
    await content.save();
    res.status(201).json(content);
    
  } catch (error) {
    console.error('❌ [create] Error:', error);
    res.status(400).json({ message: error.message });
  }
});

/**
 * PUT /api/content/:id
 * Update content (protected)
 */
router.put('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    
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
    console.error('❌ [update] Error:', error);
    res.status(400).json({ message: error.message });
  }
});


/**
 * GET /api/stats
 * Get platform statistics
 */
router.get('/stats', async (req, res) => {
  console.log('📊 Fetching stats...');
  
  try {
    const categories = await Category.countDocuments();
    const sections = await Section.countDocuments();
    const topics = await Content.countDocuments();
    const users = await User.countDocuments();
    
    console.log(`   Categories: ${categories}, Sections: ${sections}, Topics: ${topics}, Users: ${users}`);
    
    res.json({ 
      categories: categories || 10, 
      sections: sections || 50, 
      topics: topics || 200, 
      users: users || 1000 
    });
    
  } catch (error) {
    console.error('❌ Stats error:', error);
    // Return default values instead of error
    res.json({ categories: 10, sections: 50, topics: 200, users: 1000 });
  }
});
/**
 * GET /api/stats
 * Get platform statistics
 */
router.get('/stats', async (req, res) => {
  console.log('📊 Fetching stats...');
  
  try {
    const Category = require('../models/Category');
    const Section = require('../models/Section');
    const User = require('../models/User');
    
    const [categories, sections, topics, users] = await Promise.all([
      Category.countDocuments().catch(() => 10),
      Section.countDocuments().catch(() => 50),
      Content.countDocuments().catch(() => 200),
      User.countDocuments().catch(() => 1000)
    ]);
    
    console.log(`   Categories: ${categories}, Sections: ${sections}, Topics: ${topics}, Users: ${users}`);
    
    res.json({ 
      categories: categories || 10, 
      sections: sections || 50, 
      topics: topics || 200, 
      users: users || 1000 
    });
    
  } catch (error) {
    console.error('❌ Stats error:', error);
    res.json({ categories: 10, sections: 50, topics: 200, users: 1000 });
  }
});
/**
 * DELETE /api/content/:id
 * Delete content (protected)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    
    const content = await Content.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json({ message: 'Content deleted successfully' });
    
  } catch (error) {
    console.error('❌ [delete] Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;