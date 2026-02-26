const express = require('express');
const router = express.Router();

// Contact form submission (temporary version - just logs the data)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Log the contact form submission
    console.log('Contact form submission:', { name, email, subject, message });
    
    // You can add email sending functionality here later
    // For now, just return success
    
    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process message' 
    });
  }
});

module.exports = router;