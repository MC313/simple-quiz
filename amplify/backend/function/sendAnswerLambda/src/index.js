/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_QUOTESDB_ARN
	STORAGE_QUOTESDB_NAME
Amplify Params - DO NOT EDIT */
const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const region = process.env.REGION;
const tableName = process.env.STORAGE_QUOTESDB_NAME;

AWS.config.update({ region });

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async ({ body }) => {
    let statusCode = 500;
    if(!validParams(body)) {
        statusCode = 400
        throw new Error("Invalid parameters.")
    };
    try {
        const { answer, quoteId } = body;
        const dbParams = {
            TableName: tableName,
            Key: {
                quoteId
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
        console.error("Error submitting answer.", error);
        return {
            statusCode,
            body: JSON.stringify({ message: error })
        }
    }
};

function validParams(params) {
    for(param of params) {
        if(typeof(param) !== "boolean") return false;
    };
    return true;
  };
