const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
const registerUser = async (req, res) => {
    const { name, email, password, role, skillsHave, skillsWant } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            skillsHave,
            skillsWant,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// MATCH USERS
const matchUsers = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);

        const matches = await User.find({
            _id: { $ne: currentUser._id }, // exclude self
            skillsHave: { $in: currentUser.skillsWant }, // match logic
        }).select('-password');

        res.status(200).json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to match users' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    matchUsers,
};
