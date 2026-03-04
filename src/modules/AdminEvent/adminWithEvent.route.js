const express = require("express");
const { createEventController, deleteEventController, getAllEventsController, getEventByIdController, updateEventController } = require("./adminWithEvent.controller");
const auth = require("../../middleware/authenticatetoken");
const event_router = express.Router();

event_router.post('/event-create', auth, createEventController);
event_router.delete('/event-delete/:id', auth, deleteEventController);
event_router.patch('/event-update/:id', auth, updateEventController);
event_router.get('/event-get/:id', auth, getEventByIdController);
event_router.get('/event-getAll', auth, getAllEventsController);

module.exports = event_router;