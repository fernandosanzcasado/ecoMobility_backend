const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB();

var params = {
    AttributeDefinitions: [
      {
        AttributeName: 'CUSTOMER_ID',
        AttributeType: 'N'
      },
      {
        AttributeName: 'CUSTOMER_NAME',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'CUSTOMER_ID',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'CUSTOMER_NAME',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    TableName: 'CUSTOMER_LIST',
    StreamSpecification: {
      StreamEnabled: false
    }
  };

  // Call DynamoDB to create the table
  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });

    