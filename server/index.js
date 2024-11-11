import express from 'express';
import dotenv from 'dotenv';
import roomRouter from './routes/roomRouter.js';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';

dotenv.config();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI; 

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE, PUT');
  res.setHeader("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json({ limit: '10mb' }));

app.use('/user', userRouter);
app.use('/room', roomRouter);

app.use('/', (req, res) => res.json({ message: "Welcome to Our API" }));

app.use((req, res) => res.status(404).json({ success: false, message: "Not Found" }));

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection successful');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });
