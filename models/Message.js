const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: { type: String, required: true },
  },

  {
    timestamps: true,
  },
);

MessageSchema.virtual('created').get(function () {
  return `${`${this.createdAt}`.split('GMT')[0].trim()}`;
});

MessageSchema.virtual('updated').get(function () {
  return `${`${this.updatedAt}`.split('GMT')[0].trim()}`;
});

module.exports = mongoose.model('messages', MessageSchema);
