const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Regular expression to validate email format
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);
      },
      message: 'Invalid email format',
    },
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought', // Reference to another model (Thought model)
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (self-reference)
    },
  ],
});

// Define a virtual called friendCount
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
