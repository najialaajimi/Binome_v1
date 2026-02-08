const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const { generalLimiter, authLimiter, apiLimiter } = require('./middleware/rateLimit');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Apply general rate limiter to all requests
app.use(generalLimiter);

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route files
const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const bookingRoutes = require('./routes/bookings');
const messageRoutes = require('./routes/messages');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

// Mount routers with rate limiting
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/listings', apiLimiter, listingRoutes);
app.use('/api/bookings', apiLimiter, bookingRoutes);
app.use('/api/messages', apiLimiter, messageRoutes);
app.use('/api/reviews', apiLimiter, reviewRoutes);
app.use('/api/admin', apiLimiter, adminRoutes);
app.use('/api/users', apiLimiter, userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
