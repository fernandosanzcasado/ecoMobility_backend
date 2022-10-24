var AWS = require('aws-sdk');
require(`dotenv`).config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
    //endpoint: process.env.endpoint,
});

const db = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});
const data = require('./BICING.json');


console.log(data.length);

/*
data.array.forEach(function(estacio) {
    var params = {
        TableName: "Bicing",
        Item: estacio
    };

// Here is where I post to the DynamoDB table
    db.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add job", job.WorkOrder, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", job.WorkOrder);
       }
    });
});
*/







    









