const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  admin: { type: boolean, default: false },
  member: { type: boolean, default: true },
});

UserSchema.virtual('fullName').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('Users', UserSchema);
