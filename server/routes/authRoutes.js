const express = require('express');
const { registerUser, loginUser, validateToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/validateToken', validateToken);

module.exports = router;
