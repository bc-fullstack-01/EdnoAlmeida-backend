const multer = require('multer')


const {
    S3Client,
    PutObjectCommand,
} = require('@aws-sdk/client-s3')

const upload = multer({storage: multer.memoryStorage()})

const bucketName = 'first-bucket'
const config = {
    region: 'us-east-1',
    endpoint: process.env.BUCKET_ENDPOINT || 'http://localhost:9000/'
}