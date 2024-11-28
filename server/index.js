import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mongoose from 'mongoose';
import AWS from 'aws-sdk';
import fs from 'fs';
import multer from 'multer';
import userRouter from './routes/userRouter.js';
import roomRouter from './routes/roomRouter.js';

dotenv.config();

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI; 

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({ dest: 'uploads/' }); // Temporary file storage


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

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path); // Read uploaded file
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${req.file.originalname}`, // S3 object key
      Body: fileContent,
    };

    // Upload to S3
    const result = await s3.upload(params).promise();

    // Delete the temporary file after uploading to S3
    fs.unlinkSync(req.file.path);
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      url: result.Location, // S3 file URL
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message,
    });
  }
});

app.get('/', (req, res) => res.json({ message: "Welcome to Our API" }));

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
  })
