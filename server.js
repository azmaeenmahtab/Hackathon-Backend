// server.js
const express = require("express");
const cors = require("cors");
const eventRouter = require("./src/modules/AdminEvent/adminWithEvent.route");
const { studentRouter } = require("./src/modules/AdminGetStudent/student.route");
const { registrationRouter } = require("./src/modules/StudentEvent/studentInEvent.router");
const { Router } = require("./src/modules/auth/signup.route");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/signup", Router);//Event route
app.use("/api/event", eventRouter);//Event route
app.use("/api/student", studentRouter);//get all student route
app.use("/api/event", registrationRouter)//Student registration route

// Ensure DB connection is initialized
require("./src/config/db");


// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to Hackathon Backend!");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
