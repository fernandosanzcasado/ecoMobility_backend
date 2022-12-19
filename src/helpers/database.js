var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
    //endpoint: process.env.endpoint,
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

module.exports = db;