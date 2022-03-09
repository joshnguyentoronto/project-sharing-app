const aws = require('aws-sdk')

const region = "ca-central-1"
const bucketName= "project-sharing-app"
const accessKeyID = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const { 
    v4: uuidv4,
} = require('uuid');



aws.config.update({
    accessKeyID,
    secretAccessKey
})

const s3 = new aws.S3({
    region,
    signatureVersion: 'v4'
})

module.exports = {
    generateUploadURL
}

async function generateUploadURL(){
    const imageName = uuidv4() + '.jpeg'

    let params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

