const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  res.status(501).json({
    message: 'Signup: placeholder Judi, Marlin',
    note: 'User model + password hashing + JWT'
  });
});

router.post('/login', (req, res) => {
  res.status(501).json({
    message: 'Login: Placeholder Judii',
    note: 'JWT token generation'
  });
});

module.exports = router;