// src/models/Invitation.js
const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: true },
  status: {
    type: String,
    enum: ['pending', 'going', 'maybe', 'notgoing'],
    default: 'pending'
  }
}, { timestamps: true });

invitationSchema.index({ event: 1, user: 1 }, { unique: true });
invitationSchema.index({ user: 1 });

module.exports = mongoose.model('Invitation', invitationSchema);