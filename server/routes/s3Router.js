import express from 'express';
import fs from 'fs';
import AWS from 'aws-sdk';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload Route
router.post('/upload', upload.single('image'), async (req, res) => {
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

// Delete Route
router.delete('/delete', async (req, res) => {
  try {
    const { fileName } = req.body; // Expect fileName in the request body
    if (!fileName) {
      return res.status(400).json({
        success: false,
        message: 'File name is required',
      });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName, // S3 object key
    };

    // Delete from S3
    await s3.deleteObject(params).promise();

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting file',
      error: error.message,
    });
  }
});

export default router;
