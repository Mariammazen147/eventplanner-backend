const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(request, response) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    response.status(200).json({message: 'Login successful', token, user: { id: user._id, email: user.email }});
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

module.exports = { login };
