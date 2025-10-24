const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Load environment variables
dotenv.config();


// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: ['https://modern-mern-blog.vercel.app', 'https://modern-mern-blog-git-master-tejs-projects-7d0f72d9.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Blog API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
