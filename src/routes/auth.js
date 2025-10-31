const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

const validateSignup = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password ≥6 chars')
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/signup', validateSignup, handleValidation, signup);
router.post('/login', login);

module.exports = router;