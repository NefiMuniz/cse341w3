require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const missionaryRoutes = require('./routes/missionaryRoutes');
const classRoutes = require('./routes/classRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerSetup = require('./swagger/swagger');
const session = require('express-session');
const passport = require('./config/auth');
const { ensureAuthenticated } = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Using session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, sameSite: 'none', httpOnly: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Routes
app.use('/api/missionaries', missionaryRoutes);
app.use('/api/classes', classRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.username}! | <a href="/auth/logout">Logout</a> | <a href="/api-docs">API Docs</a>`);
  } else {
    res.send('Logged out | <a href="/auth/github">Login with GitHub</a> | <a href="/api-docs">API Docs</a>');
  }
});

// Swagger Documentation
swaggerSetup(app);

module.exports = app;