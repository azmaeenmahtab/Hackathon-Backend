// unregister.route.js
const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const unregisterEvent = require("./unregister.controller");

const unregisterRouter = express.Router();

// POST /api/global/events-unregister/:event_id (protected)
unregisterRouter.post("/events-unregister/:event_id", auth, unregisterEvent);

module.exports = { unregisterRouter };
