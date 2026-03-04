const express = require("express");
const auth = require("../../middleware/authenticatetoken");
const Login = require("./login.controller");

const loginRouter = express.Router();

// POST /api/login
loginRouter.post("/auth/login", auth, Login);

module.exports = { loginRouter };
