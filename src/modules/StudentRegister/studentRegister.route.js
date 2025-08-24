const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const GlobalEventRegister = require("./studentRegister.controller");

const globalEventRegisterRouter = express.Router();

// POST /api/global-events/register (protected)
globalEventRegisterRouter.post("/events-register/:event_id", auth, GlobalEventRegister);

module.exports = { globalEventRegisterRouter };
