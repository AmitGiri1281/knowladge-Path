const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  title: { type: String, required: true },
  theory: { type: String, required: true },
  notes: { type: String, required: true },
  videoUrl: { type: String, default: '' },
  views: { type: Number, default: 0 },  // 🔴 ADD THIS LINE
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);