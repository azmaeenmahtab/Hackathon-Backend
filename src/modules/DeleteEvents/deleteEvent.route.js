// routes/admin.js
const express = require('express');
const DeleteEventRouter = express.Router();
const softEventDeleteEvent = require('../DeleteEvents/deleteEvent.controller');

// Middleware to verify Firebase token (if you have one)
const auth = require('../../middleware/authenticatetoken'); // optional

// Soft delete (cancel) an event
// POST /api/admin/events/:eventId/cancel
DeleteEventRouter.post('/events/:eventId/cancel', auth, softEventDeleteEvent);

module.exports = { DeleteEventRouter };
