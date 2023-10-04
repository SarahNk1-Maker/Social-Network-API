const router = require('express').Router();
const {
  getUsers,         // Handles GET /api/users
  getSingleUser,    // Handles GET /api/users/:userId
  createUser,       // Handles POST /api/users
} = require('../../controllers/userController');

// Define routes for the user-related endpoints

// GET /api/users (Get all users)
// POST /api/users (Create a new user)
router.route('/').get(getUsers).post(createUser);

// GET /api/users/:userId (Get a single user by ID)
router.route('/:userId').get(getSingleUser);

module.exports = router;