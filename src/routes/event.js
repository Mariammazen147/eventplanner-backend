const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createEvent,
  deleteEvent,
  getOrganizedEvents,
  getInvitedEvents,
  getAllEvents,
  getEventById,
  updateEvent
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getAllEvents);                    
router.get('/:id([0-9a-fA-F]{24})', getEventById); 

router.use(protect);

router.get('/organized', getOrganizedEvents);     
router.get('/invited', getInvitedEvents);         

router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;