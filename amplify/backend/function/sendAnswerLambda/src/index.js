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
    const { answer, quoteId } = body;

    if(typeof(answer) !== "boolean" || !quoteId) throw new CustomException("Invalid parameter.", 400);

    try {
        const dbParams = {
            TableName: tableName,
            Key: {
                quoteId
            }
        };
        const { Item = null } = await dynamodb.get(dbParams).promise();
        if(!Item) throw new CustomException(`Quote with id of ${quoteId} not found.`, 404);

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
    } catch ({ message, statusCode = 500, uiMessage = "Internal server error." }) {
        console.error("Error submitting answer.", message);
        return {
            statusCode,
            body: JSON.stringify({ message })
        }
    }
};

function CustomException(message, statusCode = 500,  uiMessage = message) {
    this.message = message;
    this.statusCode = statusCode;
    this.uiMessage = uiMessage;
};