const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  admin: { type: boolean, default: false },
  member: { type: boolean, default: true },
});

module.exports = mongoose.model('Users', UserSchema);
