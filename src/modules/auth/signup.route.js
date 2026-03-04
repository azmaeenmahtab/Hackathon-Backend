const express = require("express");
const SignUp = require("./signup.controller");
const auth = require("../../middleware/authenticatetoken");

const Router = express.Router();

Router.post('/auth/sync', auth, SignUp);


module.exports = { Router };