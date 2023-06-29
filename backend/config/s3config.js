const AWS = require('aws-sdk');

const uploadToS3 = async (data, fileName) => {
  try {
    const s3 = new AWS.S3();

    const params = {
      Bucket: 'your-bucket-name', // Replace with your actual bucket name
      Key: fileName,
      Body: data
    };

    const uploadPromise = s3.upload(params).promise();
    const response = await uploadPromise;

    return response.Location;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  uploadToS3
};
