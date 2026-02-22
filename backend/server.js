const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected successfully!'))
.catch(err => console.error('❌ MongoDB connection error:', err));
// Test route to check DB globally
app.get('/test-db', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    res.json({ message: 'DB Connected Globally', collections });
  } catch (err) {
    res.status(500).json({ message: 'DB Connection Failed', error: err.message });
  }
});

// Example routes (keep your existing ones)
app.use('/api/admin', require('./routes/admin'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/sections', require('./routes/sections'));
app.use('/api/content', require('./routes/content'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/auth', require('./routes/auth'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});