
const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
     
const dynamoClient = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB();

// Set the parameters
var  params = {
  AttributeDefinitions: [
    
    {
          AttributeName: "Id", //ATTRIBUTE_NAME_1
          AttributeType: "S", //ATTRIBUTE_TYPE
        },
  ],
  KeySchema: [
    {
        AttributeName: "Id", //ATTRIBUTE_NAME_1
        KeyType: "HASH", //ATTRIBUTE_TYPE
      },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "Usuarios", //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});








