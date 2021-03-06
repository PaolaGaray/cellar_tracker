const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wineSchema = new Schema({
  winery: String,
  name: String,
  type: [String],
  year: Number,
  grape: [String],
  country: String,
  region: String,
  imgName: String,
  imgPath: String,
  imgPublicId: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  });

wineSchema.index({ location: '2dsphere'});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;