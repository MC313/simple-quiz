/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUIZGAMEDB_ARN
	STORAGE_QUIZGAMEDB_NAME
Amplify Params - DO NOT EDIT */
//const AWSXRay = require('aws-xray-sdk-core');
const AWS = require('aws-sdk');
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUIZGAMEDB_NAME;

AWS.config.update({ region });

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async ({ body }) => {
    try {
        if(!validParams(body)) return;
        const { answer, quizItemId } = body;
        const dbParams = {
            TableName: tableName,
            Key: {
                quizItemId
            }
        };
        const { Item } = await dynamodb.get(dbParams).promise();
        const { isRealQuote, source } = Item;
        const response = {
            isRealQuote,
            isCorrectAnswer: isRealQuote === answer,
            source
        };
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(response)
        }
    } catch (error) {
        console.error("Error getting answer for question.", error);
        return {
            statusCode: 500,
            message: error
        }
    }
};

function validParams(params) {
    for(param of params) {
      if(!param || param !== false) return false;
    };
    return true;
  };
