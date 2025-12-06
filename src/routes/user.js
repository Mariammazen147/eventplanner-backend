const express = require('express');
const { protect } = require('../middleware/auth');
const { getAllUsers, searchUsers } = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/', getAllUsers);
router.get('/search', searchUsers);

module.exports = router;