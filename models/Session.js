const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
    {
        learner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
