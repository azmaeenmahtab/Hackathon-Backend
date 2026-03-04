const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const adminStats = require("./adminStats.controller");

const adminStatsRouter = express.Router();

// POST /api/admin/stats (protected)
adminStatsRouter.post("/stats", auth, adminStats);

module.exports = { adminStatsRouter };
