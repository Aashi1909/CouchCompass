import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI; // MongoDB connection string from .env

const app = express();

// Set headers for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE, PUT');
  res.setHeader("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware for parsing JSON
app.use(express.json({ limit: '10mb' }));

// Room routes
app.use('/room', roomRouter);

// Default route
app.use('/', (req, res) => res.json({ message: "Welcome to Our API" }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: "Not Found" }));

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection successful');
    // Start the server once the database is connected
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if the connection fails
  });
