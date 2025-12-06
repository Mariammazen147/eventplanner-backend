const User = require('../models/User');

// GET /api/users -> Get all users
const getAllUsers = async (req, res) => {
  try {
    console.log('📍 getAllUsers called by user:', req.user?.id);

    const users = await User.find()
      .select('_id name email')
      .limit(100);

    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/search?query=Eman
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    const users = await User.find({
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ]
    })
    .select('_id name email')
    .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllUsers, searchUsers };