const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI).MONGODB_URI
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.get('/health', (req,res) => res.json({status: 'OK'}));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));