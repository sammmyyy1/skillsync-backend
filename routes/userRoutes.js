const express = require('express');
const { registerUser, loginUser, matchUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, (req, res) => {
    res.json(req.user);
});

router.get('/match', protect, matchUsers); // 👈 Matchmaking route

module.exports = router;
