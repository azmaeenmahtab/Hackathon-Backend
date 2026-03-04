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

// Routes
// const authRoutes = require("./src/modules/auth");
// const formSubmitRoutes = require("./routes/formSubmitRoutes");


// app.use("/api/auth", authRoutes);
// app.use("/api/submit", formSubmitRoutes);




// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to Hackathon Backend!");
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
