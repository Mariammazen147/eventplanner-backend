const express = require('express');
const { protect } = require('../middleware/auth');
const { createEvent, deleteEvent } = require('../controllers/EventController');

const router = express.Router();

// All routes below require login
router.use(protect);

router.post('/', createEvent);
router.delete('/:id', deleteEvent);

module.exports = router;