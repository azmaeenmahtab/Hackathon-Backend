const express = require('express');
const router = express.Router();


// Example: Home route
router.get('/', (req, res) => {
  res.send('API Home');
});

// User routes
const userController = require('../controllers/userController');
router.get('/users', userController.listUsers);

module.exports = router;
