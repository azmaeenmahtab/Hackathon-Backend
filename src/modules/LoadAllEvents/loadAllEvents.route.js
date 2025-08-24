const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const loadAllEvents = require("./loadAllEvents.controller");

const loadAllEventsRouter = express.Router();

// POST /api/events (protected)
loadAllEventsRouter.post("/events-all", auth, loadAllEvents);

module.exports = { loadAllEventsRouter };
