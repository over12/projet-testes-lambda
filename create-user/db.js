const aws = require("aws-sdk");
const db = new aws.DynamoDB.DocumentClient();

exports.db = db;