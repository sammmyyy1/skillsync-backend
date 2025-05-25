const Session = require('../models/Session');
const User = require('../models/User');

// Create a new session request
const createSession = async (req, res) => {
    const { mentorId, topic, date } = req.body;

    if (!mentorId || !topic || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const session = await Session.create({
            learner: req.user._id,
            mentor: mentorId,
            topic,
            date,
        });

        res.status(201).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create session' });
    }
};

// Get all sessions for the logged-in user (as learner or mentor)
const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({
            $or: [
                { learner: req.user._id },
                { mentor: req.user._id }
            ]
        }).populate('learner', 'name email').populate('mentor', 'name email');

        res.status(200).json(sessions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch sessions' });
    }
};

module.exports = {
    createSession,
    getMySessions,
};
