const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var dynamodb = new AWS.DynamoDB();
/* 
var params = {
    TableName: 'Usuaris',
    Item: {
      'Id' : {N: '003'},
      'User_email' : {S: 'francisco@gmail.com'},
      'CP' : {N: '08021'},
      'Password' : {S: 'Thisismypass'},
      }
  };
  */

var params = {
  TableName: "",
  Item: {
    Id: { N: "003" },
    User_email: { S: "francisco@gmail.com" },
    CP: { N: "08021" },
    Password: { S: "Thisismypass" },
  },
};

// Call DynamoDB to add the item to the table
dynamodb.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
