require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const missionaryRoutes = require('./routes/missionaryRoutes');
const classRoutes = require('./routes/classRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerSetup = require('./swagger/swagger');
const session = require('express-session');
const passport = require('./config/auth');
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

/* app.use(cors({
  origin: [
    'https://project-2-iwcv.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); */
app.use(cors());

app.set('trust proxy', 1);

// Using session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Routes
app.use('/api/missionaries', missionaryRoutes);
app.use('/api/classes', classRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  console.log('Session', req.session);
  console.log('User', req.user);
  next();
})

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.username}! | <a href="/auth/logout">Logout</a> | <a href="/api-docs">API Docs</a>`);
  } else {
    res.send('Logged out | <a href="/auth/github">Login with GitHub</a> | <a href="/api-docs">API Docs</a>');
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Swagger Documentation
swaggerSetup(app);

module.exports = app;