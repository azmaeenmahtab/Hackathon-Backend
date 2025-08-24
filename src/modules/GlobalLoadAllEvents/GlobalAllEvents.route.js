const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const getAllEvents = require("./GlobalAllEvents.controller");

const GlobalAllEventsRouter = express.Router();

// POST /api/events-all (protected)
GlobalAllEventsRouter.get("/events-all", auth, getAllEvents);

module.exports = { GlobalAllEventsRouter };
