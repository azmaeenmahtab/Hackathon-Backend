const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const studentMyEvents = require("./studentMyEvents.controller");

const studentMyEventsRouter = express.Router();

// POST /api/student/my-events (protected)
studentMyEventsRouter.post("/my-events", auth, studentMyEvents);

module.exports = { studentMyEventsRouter };
