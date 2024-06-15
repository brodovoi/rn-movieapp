// server/models/Bookmark.js

const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  overview: {
    type: String,
  },
  duration: {
    type: Number,
  },
  original_title: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
