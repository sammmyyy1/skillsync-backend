const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['learner', 'mentor', 'both'],
            default: 'learner',
        },
        skillsHave: [String],   // e.g., ['JavaScript', 'React']
        skillsWant: [String],   // e.g., ['Python', 'Machine Learning']
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
