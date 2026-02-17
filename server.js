const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');



const app = express();

const logger = require('./config/logger');

// ─── SESSION SETUP ──────────────────────────────────────────────
// Move session middleware BEFORE other middleware/routes
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-please',
        resave: false,
        saveUninitialized: false,                    // ← better default (false)
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions',
            ttl: 1000 * 60 * 60 * 24 * 7,             // 7 days in ms
            autoRemove: 'native',                      // auto clean expired
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,           // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // only HTTPS in prod
            sameSite: 'lax',
        },
    })
);

// Raw body parser for Stripe webhook - must come BEFORE express.json()
app.post(
  '/api/webhook/stripe',
  express.raw({ type: 'application/json' }),
  require('./controllers/webhookController').stripeWebhook
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'E-commerce API is running' });
});

// Root route (optional)
app.get('/', (req, res) => {
    res.send('E-commerce Backend API');
});

//auth routes
app.use('/api/auth', authRoutes);

//Product routes
app.use('/api/products', productRoutes);

//Cart routes
app.use('/api/cart', cartRoutes);

//Order Routes
app.use('/api/orders', orderRoutes);

// ─── 404 HANDLER
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});



// Global error handler (must be last)
app.use((err, req, res, next) => {
  logger.error({
    err: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    user: req.user?._id || 'guest',
  }, 'Unhandled error');

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    process.exit(1);
});