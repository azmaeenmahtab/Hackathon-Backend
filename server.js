// server.js
const express = require("express");
const cors = require("cors");
const eventRouter = require("./src/modules/AdminEvent/adminWithEvent.route");
const { studentRouter } = require("./src/modules/AdminGetStudent/student.route");
// const { registrationRouter } = require("./src/modules/StudentEvents/studentInEvents.router");
const { Router } = require("./src/modules/auth/signup.route");

const { loginRouter } = require("./src/modules/auth/login.route");
const { getUserRouter } = require("./src/modules/Get User/getuser.route");
const { adminStatsRouter } = require("./src/modules/Stats/adminStats.route");
const { loadAllEventsRouter } = require("./src/modules/LoadAllEvents/loadAllEvents.route");
const { createEventRouter } = require("./src/modules/CreateEvent/createEvent.route");
const { locationRouter } = require("./src/modules/LocationHandle/location.route");
const { studentMyEventsRouter } = require("./src/modules/StudentEvents/studentMyEvents.route");
const { GlobalAllEventsRouter } = require("./src/modules/GlobalLoadAllEvents/GlobalAllEvents.route");
const { globalEventRegisterRouter } = require("./src/modules/StudentRegister/studentRegister.route");








require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());








// ROUTES
app.use("/api/signup", Router); // Signup route
app.use("/api/login", loginRouter); // Login route
app.use("/api/event", eventRouter); // Event route
app.use("/api/student", studentRouter); // Get all student route
// app.use("/api/event", registrationRouter); // Student registration route
app.use("/auth", getUserRouter); // Get user info route
app.use("/api/admin", adminStatsRouter); // Admin stats route
app.use("/api/admin", loadAllEventsRouter); // Load all events for admin
app.use("/api/admin", createEventRouter); // Create event route

app.use("/api/location", locationRouter);
app.use("/api/student", studentMyEventsRouter); // Student my-events route
app.use("/api/global", GlobalAllEventsRouter); // Get all events for students
app.use("/api/global", globalEventRegisterRouter); // Student event registration route






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
