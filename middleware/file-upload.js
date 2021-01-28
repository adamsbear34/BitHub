const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('config');

aws.config.update({
    secretAccessKey: config.AWSSecretKey,
    accessKeyId: config.AWSAccessKeyId,
    region: 'us-east-2'
});


const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const s3 = new aws.S3();
 
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'cryptohub',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});


module.exports = upload;