require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('Backend is working!'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/event'));
app.use('/api/invitations', require('./routes/invitation'));
app.use('/api/users', require('./routes/user'));



app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Phase 0 COMPLETE', mongo: 'CONNECTED' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


