require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const missionaryRoutes = require('./routes/missionaryRoutes');
const classRoutes = require('./routes/classRoutes');
const swaggerSetup = require('./swagger/swagger');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/api/missionaries', missionaryRoutes);
app.use('/api/classes', classRoutes);

// Swagger Documentation
swaggerSetup(app);

module.exports = app;