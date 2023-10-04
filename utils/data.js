const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  // ... (other user names)
];

const emails = [
  'Aaren@gmail.com',
  'Aarez@gmail.com',
  'Aarman@gmail.com',
  'Aaron@gmail.com',
  'Aaron-James@hotmail.com',
  'Aarron@hotmail.com',
  'Aaryan@hotmail.com',
  'Aaryn@yahoo.com',
  'Aayan@yahoo.com',
  'Aazaan@yahooo.com',
  'Abaan@yahoo.com',
  'Abbas@gmail.com',
  'Abdallah@yahoo.com',
  'Abdalroof@yahoo.com',
  'Abdihakim@yahoo.com',
  'Abdirahman@hotmail.com',
  'Abdisalam@hotmail.com',
  // ... (other emails)
];

const thoughts = [
  'The sunsets at the beach are always a breathtaking sight.',
  'Learning a new language can open doors to new cultures and experiences.',
  'The laughter of children playing in the park is a joyful symphony.',
  'In the quiet of the morning, I find peace and clarity.',
  'Acts of kindness have the power to change someones entire day.',
  'Natures beauty can be found in the delicate petals of a blooming flower.',
  'A warm cup of tea on a cold winters day is pure comfort.',
  'Music has the ability to convey emotions that words alone cannot express.',
  'The feeling of accomplishment after completing a challenging task is incredibly satisfying.',
  'A smile is a universal language that brings people together.',
  'The scent of freshly baked bread is irresistible.',
  'The bond between a pet and their owner is unbreakable.',
  'Traveling allows us to explore the world and broaden our horizons.',
  'A good book has the power to transport you to different worlds.',
  'A sincere apology can heal wounds and mend relationships.',
  'The sound of rain falling on the roof is soothing and calming.',
  'The beauty of a starry night sky reminds us of the vastness of the universe.',
  // ... (other thoughts)
];


// Function to generate a random user
const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  const username = users[randomIndex];
  const email = emails[randomIndex];

  return {
    username,
    email,
    thoughts: [],
    friends: [],
  };
};

// Function to generate a random thought
const getRandomThought = () => {
  const randomIndex = Math.floor(Math.random() * thoughts.length);
  const thoughtText = thoughts[randomIndex];

  return {
    thoughtText, // Update the field name to match your Mongoose schema
    createdAt: new Date(),
    reactions: [],
  };
};

// Function to generate random reactions for a thought
const getThoughtReactions = () => {
  const numReactions = Math.floor(Math.random() * 5); // Random number of reactions (up to 5)
  const reactions = [];

  for (let i = 0; i < numReactions; i++) {
    reactions.push({
      reactionBody: '1',
      username: 'Aayan',
      createdAt: new Date(),
    });
  }

  return reactions;
};

// Function to populate the database with random users and thoughts
const populateDatabase = async (numUsers, numThoughtsPerUser) => {
  for (let i = 0; i < numUsers; i++) {
    const user = getRandomUser();

    for (let j = 0; j < numThoughtsPerUser; j++) {
      const thought = getRandomThought();
      thought.username = user.username;
      thought.reactions = getThoughtReactions();
      user.thoughts.push(thought);
    }

    // In a real database, you would save the user and thoughts here.
    // For this example, we will log the user and their thoughts.
    console.log(user);
  }
};
populateDatabase(10, 5);
// Export the populateDatabase function
module.exports = { getRandomUser, populateDatabase, getRandomThought, getThoughtReactions };
