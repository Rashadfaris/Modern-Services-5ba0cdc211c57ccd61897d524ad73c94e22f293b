const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const blogRoutes = require('./routes/blogRoutes');
const pageRoutes = require('./routes/pageRoutes');
const siteSettingsRoutes = require('./routes/siteSettingsRoutes');

// Initialize Express app
const app = express();

// Middleware
// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://modernservices.org.uk',
  'http://modernservices.org.uk',
  'https://www.modernservices.org.uk'
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
// API routes are prefixed with /api
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/site-settings', siteSettingsRoutes);

// Log registered routes
console.log('✅ Routes registered:');
console.log('   - /api/testimonials');
console.log('   - /api/contact');
console.log('   - /api/blogs');
console.log('   - /api/pages');
console.log('   - /api/site-settings');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Modern Services API',
    version: '1.0.0',
    endpoints: {
      testimonials: '/api/testimonials',
      approved: '/api/testimonials/approved',
      contact: '/api/contact',
      blogs: '/api/blogs',
      pages: '/api/pages',
      siteSettings: '/api/site-settings',
      health: '/api/health'
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

module.exports = app;

