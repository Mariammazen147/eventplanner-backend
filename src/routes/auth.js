import {login} from '../controllers/authController.js';

const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  res.status(501).json({
    message: 'Signup: placeholder Judi, Marlin',
    note: 'User model + password hashing + JWT'
  });
});

router.post('/login', login);

module.exports = router;