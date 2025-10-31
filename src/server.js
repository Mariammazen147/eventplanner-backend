require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Placeholder
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health Check (YOUR PROOF OF WORK)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Member 1: Backend skeleton ready',
    phase: 'Phase 0',
    member1: 'Server + Structure + Health Check',
    waiting_for: 'Member 2 (MongoDB), Member 3 (Auth)',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});