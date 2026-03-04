const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const getUserInfo = require("./getuser.controller");

const getUserRouter = express.Router();

// GET /auth/get-user/:uid (protected)
getUserRouter.get("/get-user/:uid", auth, getUserInfo);
// POST /auth/get-user (protected, uid in body)
getUserRouter.post("/get-user", auth, getUserInfo);

module.exports = { getUserRouter };
