const Event = require('../models/Event');
const Invitation = require('../models/Invitations');


// POST /api/events - Create event
const createEvent = async (req, res) => {
  const { title, description, date, time, location } = req.body;

  try {
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizer: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/events/:id - Delete own event only
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Only organizer can delete
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete events you organized' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events/organized → My organized events
const getOrganizedEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// GET /api/events/invited → events I am invited to
const getInvitedEvents = async (req, res) => {
  try {
    const invitations = await Invitation.find({ user: req.user.id })
      .populate({
        path: 'event',
        populate: { path: 'organizer', select: 'name email' }
      })
      .lean(); 

    const events = invitations
      .filter(inv => inv.event !== null)  
      .map(inv => ({
        ...inv.event,
        attendanceStatus: inv.status === 'going' ? 'Going' :
                          inv.status === 'maybe' ? 'Maybe' :
                          inv.status === 'notgoing' ? 'Not Going' : 'Pending'
      }));

    res.json(events);
  } catch (err) {
    console.error('getInvitedEvents error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/events → All events (public)
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events/:id → Event details
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/events/:id → Update event (only organizer)
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Only organizer can update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/events/search → ADVANCED SEARCH
const searchEvents = async (req, res) => {
  try {
    const { keyword, dateFrom, dateTo, role } = req.query;
    const userId = req.user.id;

    let filter = {};

    // Keyword in title or description
    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      filter.$or = [
        { title: regex },
        { description: regex }
      ];
    }

    // Date range
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) filter.date.$gte = new Date(dateFrom);
      if (dateTo) filter.date.$lte = new Date(dateTo);
    }

    // Role filtering 
    if (role) {
      if (role === 'organizer') {
        filter.organizer = userId;
      } else if (role === 'invited') {
        const invitedEvents = await Invitation.find({ user: userId })
          .distinct('event');
        filter._id = { $in: invitedEvents };
      }
    }

    const events = await Event.find(filter)
    .populate({ path: 'organizer', select: 'name email' })
    .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  getOrganizedEvents,
  getInvitedEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  searchEvents
};