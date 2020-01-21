/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
var bodyParser = require('body-parser');
var express = require('express');

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "QuizItemTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "quizItemId";
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = sortKeyName !== "";
const path = "/quizitem";
const UNAUTH = 'UNAUTH';


// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, authorization, x-amz-date, x-amz-security-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path, async (req, res) => {
  const itemsCountParams = {
  	TableName: tableName
  };
  
  let params = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: null
    },
  };
  
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  try {
    const { Items } = await dynamodb.scan(itemsCountParams).promise();
    const randomIndex = getRandomNumber(0, Items.length);
    const randomItemId = Items[randomIndex].quizItemId;
    params.Key[partitionKeyName] = randomItemId;
    const { Item } = await dynamodb.get(params).promise();
    res.statusCode = 200;
    res.json({ body: Item });
  } catch (error) {
	res.statusCode = 500;
  	res.json({ error });
  }
});

app.post(path, async (req, res) => {
  const { answer, quizItemId } = req.body;
  
  const params = {
    TableName: tableName,
    Key: {
      [partitionKeyName]: quizItemId
    }
  };
  
  try {
    const { Item } = await dynamodb.get(params).promise();
    const answerObj = { 
	  isRealQuote: Item.isRealQuote,
	  isCorrectAnswer: Item.isRealQuote === answer,
	  source: Item.source
	};
    res.statusCode = 200;
    res.json({ body: answerObj });
  } catch (error) {
	res.statusCode = 500;
  	res.json({ error });
  }
});


app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
