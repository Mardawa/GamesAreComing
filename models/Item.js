const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rdate: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model('item', itemSchema);
module.exports = Item;
