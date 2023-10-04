const mongoose = require('mongoose');

// Define a reaction schema for nested documents
const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    trim: true,
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

// Define the Thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      // Custom getter to format the timestamp
      return new Date(createdAt).toLocaleDateString();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Array of nested reaction documents
});

// Define a virtual called reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create and export the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
