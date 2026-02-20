const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  progress: [{
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    quizScores: [{
      quizId: String,
      score: Number,
      date: Date
    }]
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual to check if user is admin
userSchema.virtual('isAdministrator').get(function() {
  return this.role === 'admin' || this.isAdmin === true;
});

module.exports = mongoose.model('User', userSchema);