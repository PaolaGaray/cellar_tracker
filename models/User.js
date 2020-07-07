const mongoose = require('mongoose');
const Wine = require('./Wine');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  wineIds: [{ type: Schema.Types.ObjectId, ref: "Wine"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;