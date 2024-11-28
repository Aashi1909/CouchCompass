require('dotenv').config(); 
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadImage = async (filePath, key) => {
  try {
    const fileContent = fs.readFileSync(filePath); 
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: key,                          
      Body: fileContent,               
    };
    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully:', result.Location);
    return result.Location; 
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

module.exports = {
  uploadImage,
};
