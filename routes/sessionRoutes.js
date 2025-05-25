const express = require('express');
const { createSession, getMySessions } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a session request
router.post('/', protect, createSession);

// Get all sessions for logged-in user
router.get('/', protect, getMySessions);

module.exports = router;
