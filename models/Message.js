const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Messages', MessageSchema);
