const express = require("express");
const createOrFindLocation = require("./location.controller");
const auth = require("../../middleware/authenticatetoken");

const locationRouter = express.Router();

// POST /api/location
locationRouter.post("/setLocation", auth, createOrFindLocation);

module.exports = { locationRouter };
