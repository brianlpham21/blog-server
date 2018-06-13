'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  titleSubtext: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  photoLink: String,
  photoCaption: String,
  text: String
});

PostSchema.methods.serialize = function() {
  return {
    id: this._id || '',
    title: this.title || '',
    titleSubtext: this.titleSubtext || '',
    date: this.date || '',
    category: this.category || '',
    photoLink: this.photoLink || '',
    photoCaption: this.photoCaption || '',
    text: this.text || ''
  };
};

const Post = mongoose.model('Post', PostSchema);

module.exports = {Post};
