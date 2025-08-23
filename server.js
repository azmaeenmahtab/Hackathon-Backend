// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


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
