const express = require("express");
const { getAllStudentsController } = require("./student.controller");
const auth = require("../../middleware/authenticatetoken");

const studentRouter = express.Router();

studentRouter.get('/students-getAll', auth, getAllStudentsController);

module.exports = { studentRouter };