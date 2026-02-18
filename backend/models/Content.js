const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  theory: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    default: ''
  },
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }],
  resources: [{
    title: String,
    url: String,
    type: String // 'pdf', 'link', 'code'
  }],
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema);