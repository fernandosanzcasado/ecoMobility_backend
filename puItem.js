const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Users",
  Item: {
    Email: { S: "francisco@gmail.com" },
    User_nick: { S: "francisc" },
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
