const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    console.log('Connecting to MongoDB at:', connectionString);

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB