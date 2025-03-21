const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // const connectionString = `${process.env.MONGODB_URL/process.env.DB_NAME}?retryWrites=true&w=majority`;
    // console.log('Connecting to MongoDB at:', connectionString);

    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB