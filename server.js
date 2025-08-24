// server.js
const express = require("express");
const cors = require("cors");
const { eventRouter } = require("./src/AdminEvent/adminWithEvent.route");
const { studentRouter } = require("./src/AdminGetStudent/student.route");
const { registrationRouter } = require("./src/StudentEvent/studentInEven.router");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//ROUTES 
app.use("/api/v1/event",eventRouter);//Event route
app.use("/api/v1/student",studentRouter);//get all student route
app.use("/api/v1/event",registrationRouter)//Student registration route

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
