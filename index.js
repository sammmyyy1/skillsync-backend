const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes'); // ✅ added

app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes); // ✅ added

app.get('/', (req, res) => {
    res.status(200).json({ message: 'SkillSync API is running...' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
