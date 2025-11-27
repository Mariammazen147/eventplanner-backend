const Event = require('../models/Event');

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

module.exports = { createEvent, deleteEvent };