const mongoose = require('mongoose');

// Define the Reaction subdocument schema
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      // Custom getter to format the timestamp
      return new Date(createdAt).toLocaleDateString();
    },
  },
});

// Export the Reaction subdocument schema
module.exports = reactionSchema;

