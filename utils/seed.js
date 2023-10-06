Seed.js
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThought } = require('./data');

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Delete the collections if they exist
    const thoughtCheck = await Thought.exists({});
    if (thoughtCheck) {
      await Thought.deleteMany({});
      console.log('Thought collection deleted.');
    }

    const userCheck = await User.exists({});
    if (userCheck) {
      await User.deleteMany({});
      console.log('User collection deleted.');
    }

    // Create the collections
    const thoughts = [];
    const users = [];
    
    try {
      for (let i = 0; i < 20; i++) {
        const user = getRandomUser(); // Generate a random user
        const thought = getRandomThought(); // Generate a random thought
        
        if (!user || !thought) {
          console.error('Error generating user or thought. Check getRandomUser and getRandomThought functions.');
          process.exit(1);
        }
        
        thought.username = user.username; // Set the thought's username to match the user
        thoughts.push(thought);
        users.push(user);
      }
    } catch (error) {
      console.error('Error generating user or thought:', error);
      process.exit(1);
    }
    
    await User.insertMany(users);

    // Insert thoughts into the Thought collection
    await Thought.insertMany(thoughts);

    console.log('Thoughts inserted.');
    console.log('Users inserted.');
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
});
