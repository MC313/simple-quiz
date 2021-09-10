/* Amplify Params - DO NOT EDIT
  API_QUIZGAMEAPI_APIID
  API_QUIZGAMEAPI_APINAME
  ENV
  REGION
  STORAGE_QUIZGAMEDB_ARN
  STORAGE_QUIZGAMEDB_NAME
Amplify Params - DO NOT EDIT */
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUIZGAMEDB_NAME;

AWS.config.update({ region });

const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async ({ body, httpMethod }) => {
  try {
      const response = await handleRequest(httpMethod, body);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "https://www.*.d22x2a4d5wtl14.amplifyapp.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
        body: JSON.stringify({ response })
      }
  } catch (error) {
    return {
      statusCode: 500,
      error
    }
  }
};

async function handleRequest(httpMethod, body) {
  switch(httpMethod) {
    case "GET":
      return await getRandomQuote()
    case "POST":
      return await submitAnswer(body)
    default:
      throw new Error("Invalid http method")
  }
};

async function submitAnswer(body) {
  if(!validParams(body)) return;
  const { Item } = await dynamodb.get(params).promise();
  const { isRealQuote, source } = Item;
  return {
    isRealQuote,
    isCorrectAnswer: Item.isRealQuote === answer,
    source
  };
};

async function getRandomQuote() {
  const dbParams = { TableName: tableName };
  const { Items } = await dynamodb.scan(dbParams).promise();
  const randomIndex = getRandomNumber(0, Items.length);
  const { quizItemId } = Items[randomIndex];
  params.Key[partitionKeyName] = quizItemId;
  const { Item } = getItem(params);
  return Item;
};

async function getItem(params) {
  try {
    const { Item } = await dynamodb.get({ TableName: tableName, ...params }).promise();
    return Item;
  } catch (error) {
    return error;
  }
};

function validParams(params) {
  for(param of params) {
    if(!param || param !== false) return false;
  };
  return true;
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
