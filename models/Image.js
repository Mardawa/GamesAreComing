const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const imageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  }
});

const Image = mongoose.model('image', imageSchema);
module.exports = Image;
