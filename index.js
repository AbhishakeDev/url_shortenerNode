import express from 'express';
import connectDB from './config/db.js';
import baseRoutes from './routes/index.js';
import urlRoutes from './routes/url.js';

const app = express();
connectDB();

app.use(express.json({ extended: false }));

// Routes

app.use('/', baseRoutes);
app.use('/api/url/', urlRoutes);

const PORT = 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));