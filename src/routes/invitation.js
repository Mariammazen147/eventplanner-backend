const express = require('express');
const { protect } = require('../middleware/auth');
const {
  inviteUser,
  respondAttendance,
  getEventAttendees
} = require('../controllers/InvitationController.js');

const router = express.Router();

router.use(protect);

router.post('/:eventId/invite', inviteUser);
router.put('/:eventId/attendance', respondAttendance);
router.get('/:eventId/attendees', getEventAttendees);

module.exports = router;
