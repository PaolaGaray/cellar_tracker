const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wineSchema = new Schema({
  winery: String,
  name: String,
  type: String,
  year: Number,
  grape: [String],
  Country: String,
  Region: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  });

const Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;