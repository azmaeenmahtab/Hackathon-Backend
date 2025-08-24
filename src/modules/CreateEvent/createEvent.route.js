const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const createEvent = require("./createEvent.controller");

const createEventRouter = express.Router();

// POST /admin/create-event (protected)
createEventRouter.post("/create-event", auth, createEvent);

module.exports = { createEventRouter };
