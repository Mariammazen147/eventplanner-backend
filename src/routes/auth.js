const express = require('express');
const router = express.Router();

// PLACEHOLDERS 
router.post('/signup', (req, res) => {
  res.status(501).json({ message: 'Signup endpoint not implemented yet (Member 2 & 3)' });
});

router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Login endpoint not implemented yet (Member 3)' });
});

module.exports = router;