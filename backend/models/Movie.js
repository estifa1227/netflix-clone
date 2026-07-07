const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  genre: {
    type: [String],
    required: [true, 'Genre is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 0,
    max: 10,
  },
  cast: [{
    name: String,
    role: String,
  }],
  director: {
    type: String,
    default: '',
  },
  poster: {
    type: String,
    default: '',
  },
  banner: {
    type: String,
    default: '',
  },
  trailer: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['trending', 'popular', 'action', 'comedy', 'horror', 'sci-fi', 'drama', 'romance', 'new'],
    required: [true, 'Category is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
