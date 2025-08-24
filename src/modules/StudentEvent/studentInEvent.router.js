const express = require("express");
const registrationRouter = express.Router();

// Example route (replace with your actual handlers)
registrationRouter.get("/test", (req, res) => {
    res.send("Student Event Registration route is working!");
});

module.exports = { registrationRouter };
