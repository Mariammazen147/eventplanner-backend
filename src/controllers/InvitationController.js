const Event = require('../models/Event');
const User = require('../models/User');
const Invitation = require('../models/Invitations');

//POST /api/invitations/:eventId/invite
const inviteUser = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    //only organizer can invite
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only organizer can invite users' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User to invite not found' });

    const existing = await Invitation.findOne({ event: eventId, user: userId });
    if (existing) return res.status(400).json({ error: 'User already invited' });

    const invite = await Invitation.create({ event: eventId, user: userId });
    res.status(201).json({ success: true, invitation: invite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//PUT /api/invitations/:eventId/attendance
//Body: { status: "going", "maybe", "notgoing" }
const respondAttendance = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;
    const allowed = ['going', 'maybe', 'notgoing'];

    if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });

    let invitation = await Invitation.findOne({ event: eventId, user: req.user.id });

    if (!invitation) {
      //If no invitation exists, create it with the user's response
      invitation = await Invitation.create({ event: eventId, user: req.user.id, status });
      return res.json({ success: true, invitation });
    }

    invitation.status = status;
    await invitation.save();

    res.json({ success: true, invitation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//GET /api/invitations/:eventId/attendees
const getEventAttendees = async (req, res) => {
  try {
    const { eventId } = req.params;
    const invitations = await Invitation.find({ event: eventId })
      .populate('user', 'name email _id')
      .select('status user')
      .lean();

    const attendees = invitations.map(inv => ({
      user: {
        _id: inv.user._id,
        name: inv.user.name || inv.user.email.split('@')[0], // fallback if name missing
        email: inv.user.email
      },
      status: inv.status === 'going' ? 'Going' :
              inv.status === 'maybe' ? 'Maybe' :
              inv.status === 'notgoing' ? 'Not Going' : 'Pending'
    }));

    res.json(attendees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  inviteUser,
  respondAttendance,
  getEventAttendees
};
